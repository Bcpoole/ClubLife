using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Reflection;

public class ObjectIdConverter : JsonConverter {
  public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
    serializer.Serialize(writer, value.ToString());

  }

  public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
    JToken token = JToken.Load(reader);
    //if (objectType == typeof(MongoDB.Bson.ObjectId)) {
    //  var machine = (int)token["machine"];
    //  var pid = (short)token["pid"];
    //  var inc = (int)token["increment"];
    //  var dtc = (DateTime)token["timestamp"];
    //  var dt = Convert.ToDateTime(token["timestamp"]);
    //  var x = new ObjectId(Convert.ToDateTime(token["timestamp"]), (int)token["machine"], (short)token["pid"], (int)token["increment"]);
    //  var isEq = x.ToString() == "5824ebbb17b44627c34fa678";
    //  var y = x;
    //}
    return new ObjectId(token.ToObject<string>());
  }

  public override bool CanConvert(Type objectType) {
    return typeof(ObjectId).IsAssignableFrom(objectType);
  }
}