using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Shared.Utils;

namespace Shared.Converters;

public class Base64FileJsonConverter : JsonConverter<IFormFile>
{
    public override IFormFile? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.String)
        {
            throw new JsonException($"Expected a JSON string, but got {reader.TokenType}.");
        }

        var base64String = reader.GetString();
        if (string.IsNullOrEmpty(base64String))
        {
            return null;
        }
        
        var fileBytes = Convert.FromBase64String(base64String);
        
        return new FormFile(new MemoryStream(fileBytes), 0, fileBytes.Length, null, "file");
    }

    public override void Write(Utf8JsonWriter writer, IFormFile value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(FileUtils.ConvertFileFormToBase64(value));
    }
}