using System;
namespace ProcessLexicon
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length >= 2)
            {
                var inputFilePath = args[0];
                var outputFilePath = args[1];
                if (FileHandler.ValidatePaths(inputFilePath, outputFilePath))
                {
                    var sb = FileHandler.ReadFile(inputFilePath);
                    var decoded = ShouldUseMILADictionary(args) ?
                        MILADecoder.Decode(sb.ToString()) :
                        NikudHandler.RemoveNikudByLetters(sb.ToString());
                    FileHandler.WriteFile(decoded, outputFilePath);
                }
            }
            else
            {
                Console.WriteLine("Please provide input and output paths.");
            }
        }
        private static bool ShouldUseMILADictionary(string[] args)
        {
            bool shouldUseMILADictionary = true;
            if (args.Length > 2)
            {
                shouldUseMILADictionary = bool.Parse(args[args.Length - 1]);
            }
            return shouldUseMILADictionary;
        }
    }
}