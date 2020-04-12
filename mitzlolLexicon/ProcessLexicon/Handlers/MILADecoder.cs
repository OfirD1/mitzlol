using System.Text.RegularExpressions;
using System.Web;

namespace ProcessLexicon
{
    class MILADecoder
    {
        /// <summary>
        /// Decodes a Url-Encoded string
        /// </summary>
        public static string Decode(string s)
        {
            var urlEncodedPattern = @"%[+%0-9A-Z]+";
            var urlEncodedRegex = new Regex(urlEncodedPattern);
            var decoded = urlEncodedRegex.Replace(s, DecodeUrlEncodedString);
            return decoded;
        }
        private static string DecodeUrlEncodedString(Match match)
        {
            var decoded = string.Empty;
            decoded = HttpUtility.UrlDecode(match.Value, System.Text.Encoding.UTF8);
            decoded = Sanitize(decoded);
            return decoded;
        }
        private static string Sanitize(string s)
        {
            var sanitized = EscapeQuotes(s);
            return sanitized;
        }
        private static string EscapeQuotes(string s)
        {
            var quotesPattern = "[\'\"]+";
            var quotesRegex = new Regex(quotesPattern);
            var escaped = quotesRegex.Replace(s, match => string.Concat("\\", match));
            return escaped;
        }
    }
}