using System;
using System.IO;
using System.Text;

namespace ProcessLexicon
{
    internal class FileHandler
    {
        /// <summary>
        /// Validates input and output paths
        /// </summary>
        public static bool ValidatePaths(string inputFilePath, string outputFilePath)
        {
            var isValid = true;
            if (false) {}
            else if (string.IsNullOrEmpty(Path.GetDirectoryName(inputFilePath)) ||
                     string.IsNullOrEmpty(Path.GetDirectoryName(outputFilePath)))
            {
                isValid = false;
                Console.WriteLine(@"Please provide a directory name (e.g., .\file1.txt, or: path\to\file\file2.txt)");
            }
            else if (!File.Exists(inputFilePath))
            {
                isValid = false;
                Console.WriteLine($"The input file {inputFilePath} doesn't exist.");
            }
            else if (!Directory.Exists(Path.GetDirectoryName(outputFilePath)))
            {
                isValid = false;
                Console.WriteLine($"The output directory {Path.GetDirectoryName(outputFilePath)} doesn't exist.");
            }
            else if (!Path.GetFileName(outputFilePath).Contains("."))
            {
                isValid = false;
                Console.WriteLine(@"Please provide an extension at the end of the output file path (e.g., path\to\output\file2.txt)");
            }
            return isValid;
        }
        /// <summary>
        /// Reads a file that contains a string-representable data (e.g., source code file)
        /// </summary>
        public static StringBuilder ReadFile(string filename)
        {
            var stringBuilder = new StringBuilder();
            const int BUFFER_SIZE = 16384;
            using (var fileStream = new FileStream(filename, FileMode.Open, FileAccess.Read))
            {
                using (StreamReader streamReader = new StreamReader(fileStream))
                {
                    var fileContents = new char[BUFFER_SIZE];
                    var charsRead = streamReader.Read(fileContents, 0, BUFFER_SIZE);
                    while (charsRead > 0)
                    {
                        stringBuilder.Append(fileContents, 0, charsRead);
                        charsRead = streamReader.Read(fileContents, 0, BUFFER_SIZE);
                    }
                }
            }
            return stringBuilder;
        }
        /// <summary>
        /// Writes a file that contains a string-representable data
        /// </summary>
        public static void WriteFile(string data, string outputFilePath)
        {
            using (StreamWriter stream = new StreamWriter(outputFilePath))
            {
                stream.WriteLine(data);
            }
            Console.WriteLine($"{Path.GetFileName(outputFilePath)} was created successfully!");
        }
    }
}