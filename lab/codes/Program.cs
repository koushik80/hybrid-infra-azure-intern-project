 using Azure.Storage;
 using Azure.Storage.Blobs;
 using Azure.Storage.Blobs.Models;
 using System;
 using System.Threading.Tasks;    
 public class Program
 {
     //Update the blobServiceEndpoint value that you recorded previously in this lab.        
     private const string blobServiceEndpoint = "https://mediastorkoushik80.blob.core.windows.net/";

     //Update the storageAccountName value that you recorded previously in this lab.
     private const string storageAccountName = "mediastorkoushik80";

     //Update the storageAccountKey value that you recorded previously in this lab.
     private const string storageAccountKey = "my_key";    

     //The following code to create a new asynchronous Main method
     public static async Task Main(string[] args)
     { 
        //The following line of code to create a new instance of the StorageSharedKeyCredential class by using the storageAccountName and storageAccountKey constants as constructor parameters
     StorageSharedKeyCredential accountCredentials = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);

     //The following line of code to create a new instance of the BlobServiceClient class by using the blobServiceEndpoint constant and the accountCredentials variable as constructor parameters
     BlobServiceClient serviceClient = new BlobServiceClient(new Uri(blobServiceEndpoint), accountCredentials);

     //The following line of code to invoke the GetAccountInfoAsync method of the BlobServiceClient class to retrieve account metadata from the service
     AccountInfo info = await serviceClient.GetAccountInfoAsync();

     //Render a welcome message
     await Console.Out.WriteLineAsync($"Connected to Azure Storage Account");

     //Render the storage account's name
     await Console.Out.WriteLineAsync($"Account name:\t{storageAccountName}");

     //Render the type of storage account
     await Console.Out.WriteLineAsync($"Account kind:\t{info?.AccountKind}");

     //Render the currently selected stock keeping unit (SKU) for the storage account
     await Console.Out.WriteLineAsync($"Account sku:\t{info?.SkuName}");
    
      /* To invoke the EnumerateContainersAsync method, 
         passing in the serviceClient variable as a parameter */
     await EnumerateContainersAsync(serviceClient);

     }
     private static async Task EnumerateContainersAsync(BlobServiceClient client)
     {   
          /*Create an asynchronous foreach loop that iterates over the results of 
              an invocation of the GetBlobContainersAsync method of the BlobServiceClient class. */    
          await foreach (BlobContainerItem container in client.GetBlobContainersAsync())
          {   
              //Print the name of each container
              await Console.Out.WriteLineAsync($"Container:\t{container.Name}");
          }
     }
 }
 



 


