using System;
using System.Text.RegularExpressions;
using System.IO;
using System.Text;

namespace ProcessLexicon
{
    public class NikudHandler
    {
        public static string RemoveNikudByLetters(string s)
        {
            string exclusionGroup = string.Join("|", new string[] {
                "בּ", "כּ", "פּ", "וְ", "וִ", "וֵ", "וֶ", "וַ", "וָ", "וֻ", "וֱ", "וֳ", "וֲ", "שׂ", "שׁ"
            });
            string leaveOnly = String.Concat(String.Format(@"({0})|\p{{M}}+", exclusionGroup));
            string stripped = Regex.Replace(s, leaveOnly, "$1");
            return stripped;
        }
    }
}