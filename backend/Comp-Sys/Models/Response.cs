using System.Text.Json.Serialization;

namespace Comp_Sys.Models
{
    public class Response<T>
    {
        public int StatusCode { get; set; }
        public string? StatusMessage { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public T? RespData { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public List<T>? ListData { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? MiscData { get; set; }
        public Response()
        {
            ListData = new List<T>();
        }
    }
}
