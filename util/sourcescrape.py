#####
#   sourcescrape.py
#   Scrapes the Collegiatelink website in multithreaded fashion and writes
#   relevant data to a single JSON file for later consumption.
#
#   External dependencies:
#   - BeautifulSoup4 (for HTML parsing)
#   - requests (general HTTP library)
#####

# Imports
#        Threading Stuff
import threading
from queue import Queue
#        Parsing Stuff
from bs4 import BeautifulSoup
import requests
import json
#        Helpful Stuff
import itertools
from math import ceil
import time

# Constants
MAX_ACTIVE_SCRAPERS = 8
COLLEGIATELINK_URL = "https://ua.collegiatelink.net"
ORGANIZATIONS_URL = COLLEGIATELINK_URL+"/organizations"
ORGANIZATIONS_URL_FORMAT_STRING = (
    ORGANIZATIONS_URL+"?SearchType=None&SelectedCategoryId=0&CurrentPage={}")
OUTPUT_FILE = "output.json"
LOG_FILE = "sourcescrape-{0}.log".format(str(time.time()))
# I know I could import logging and stuff but I was getting too much noise
# and not enough signal in them; so I think an ad hoc solution with a minimal
# logger class works best.
class Logging:
    def __init__(self, logfile):
        self.logfile = open(logfile, "a")
    def log(self, line):
        self.logfile.write(line+"\n")
    def cleanup(self):
        self.logfile.close()

LOG = Logging(LOG_FILE)
def log(line):
    LOG.log(line) #save 4 keystrokes per log statement but waste those saved keystrokes on this comment

def conditionalLog(url, predicate, line):
    # log for specific urls without cluttering code with if statements
    if predicate(url):
        log(line)

# Predicates for Logging
def containsACM(url):
    return "acm" in url


# Classes
class OrganizationScraper:
    def __init__(self, url):
        url = url if str.startswith(url, "http") else COLLEGIATELINK_URL + url
        self.url = url
        log("OrganizationScraper initialized for url: {0}".format(url))
        self.mainsoup = BeautifulSoup(requests.get(url).text, "html.parser")
        self.aboutsoup = BeautifulSoup(requests.get(url+"/about").text,"html.parser")
        self.json = self._scrapeResults()

    def _scrapeResults(self):
        d = {} # dictionary to fill
        # Gather information from the org's main page
        d["name"] = str(self.mainsoup.find("h2").string).strip()
        theImg = self.mainsoup.find(class_="img__orgavatar")
        if theImg is not None:
            try:
                imgstylestring = str(self.mainsoup.find(class_="img__orgavatar")["style"])
            except KeyError:
                imgstylestring = ""
        else:
            imgstylestring = ""
        if ".png" in imgstylestring:
            if "https://" in imgstylestring:
                d["img"] = "https://{0}.png".format("".join(imgstylestring.split("https://")[1:]).split(".png")[0])
            elif "http://" in imgstylestring:
                d["img"] = "http://{0}.png".format("".join(imgstylestring.split("http://")[1:]).split(".png")[0])
        elif ".jpg" in imgstylestring:
            if "https://" in imgstylestring:
                d["img"] = "https://{0}.jpg".format("".join(imgstylestring.split("https://")[1:]).split(".jpg")[0])
            elif "http://" in imgstylestring:
                d["img"] = "http://{0}.jpg".format("".join(imgstylestring.split("http://")[1:]).split(".jpg")[0])
        try:
            d["full summary"] = str(self.mainsoup.find(class_="container-orgabout").find(
                "p").string).strip()
        except AttributeError:
            print("Attribute error for URL {0} when finding after find container-orgabout".format(self.url))
            logging.error("Attribute error for URL {0} when finding after find container-orgabout".format(self.url))
        try:
            d["primary contact"] = str(self.mainsoup.find(class_="container-orgcontact").find_all(
                "li")[1].string).strip()
        except AttributeError:
            print("Attribute error for URL {0} when finding after find container-orgcontact".format(self.url))
            d["primary contact"] = "LOL AN ERROR"
            logging.error("Attribute error for URL {0} when finding after find container-orgcontact".format(self.url))
        # Gather information from the org's about page
        about = {}
        node = self.aboutsoup.find(class_="content-main").find("section").find(class_="col-sm-8")
        try:
            about["Parent Organization"] = ":".join(node.find("em").text.split(":")[1:]).strip()
        except AttributeError:
            about["Parent Organization"] = "LOL AN ERROR"
        try:
            about["Full Summary"] = str(node.find_all("p")[1].string).strip()
        except AttributeError:
            about["Full Summary"] = "LOL AN ERROR"
        try:
            node = node.find(class_="additionalInformation")
            try:
                titles = [n for n in node.find_all("strong") if not n.find("span")]
                contents = [str(n.string).replace("<em>","").replace("</em>","").strip() for n in node.find_all("p")]
                for i in range(len(titles)):
                    about[str(titles[i].string)] = contents[i]
            except AttributeError:
                pass
        except AttributeError:
            pass
        d["about"] = about
        return d

    def getData(self):
        return self.json

class OrganizationListScraper:
    def __init__(self, url=ORGANIZATIONS_URL):
        log("OrganizationListScraper initialized for url: {0}".format(url))
        self.soup = BeautifulSoup(requests.get(url).text, "html.parser")
        self.countNode = self.soup.find(class_="pageHeading-count")
    def getResultsPerPage(self):
        #get array of [numFrom, "-", numTo]
        arr = str(self.countNode.find("strong").string).strip().split(" ")
        return int(arr[2]) - int(arr[0]) + 1
    def getTotalResults(self):
        return int(self.countNode.find_all("strong")[1].string)
    def getOrganizationsOnPage(self):
        """
        Returns an array of objects representing the underlying
        organization pages:
        {
            "name": "$organizationName",
            "url": "$urlToOrganization",
            "summary": "$shortSummary"
        }
        """
        results = self.soup.find(id="results").find_all(class_="result")
        def _toObj(result):
            url = str(result.find("a")["href"])
            name = str(result.find("a").string)
            summary = str(result.find("p").string)
            return {"url": url, "name": name, "summary": summary}
        return [_toObj(r) for r in results]


# Thread worker
def scrapeListPageWorker(s, q, scraper):
    with s:
        orgs = scraper.getOrganizationsOnPage()
        q.put([{**org, **(OrganizationScraper(org["url"]).getData())} for org in orgs])

# Main driver
def main():
    # Figure out the work that we need to do
    firstPageScraper = OrganizationListScraper()
    resultsPerPage = firstPageScraper.getResultsPerPage()
    totalResults = firstPageScraper.getTotalResults()
    log("TOTAL RESULTS IS {0}".format(totalResults))
    numPages = int(ceil(totalResults/resultsPerPage))
    organizationListScrapers = itertools.chain([firstPageScraper],
        [OrganizationListScraper(ORGANIZATIONS_URL_FORMAT_STRING.format(i)) for i in range(2,numPages+1,1)])
    threads = []
    q = Queue()
    s = threading.Semaphore(MAX_ACTIVE_SCRAPERS)
    for scraper in organizationListScrapers:
        t = threading.Thread(target=scrapeListPageWorker, args=(s,q,scraper))
        t.start()
        threads.append(t)
    for thread in threads:
        thread.join()
    # once each page is scraped, concat all the json and write it out to a file
    results = []
    while(not q.empty()):
        o = q.get()
        results.append(o) #make results a list of lists
    results = list(itertools.chain.from_iterable(results)) #flatten lists
    with open(OUTPUT_FILE,"w") as f:
        f.write(json.dumps(results))
    return 0

if __name__=="__main__":
    main()
LOG.cleanup()
