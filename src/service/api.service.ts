// src/service/api.service.ts

class ApiService {
  // Assuming you have a base URL for your API
  private baseUrl: string = 'http://localhost:1006'; // Adjust the URL accordingly

  async sendJsonRpcRequest(method: string, params: any[]): Promise<any> {
    const url = `${this.baseUrl}/`; // Update with your actual API endpoint

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: method,
          params: params,
          id: 1, // You may want to use a unique identifier for the id
        }),
      });
      console.log("RESPONSE: ", response);

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data: any = await response.json();
      console.log("DATA: ", data);

      return data;
    } catch (error: any) {
      console.error('Error sending JSON-RPC request:', error);

      // Display the error message on the webpage
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) {
        errorMessage.innerText = `Error: ${error.message}`;
      }

      throw error;
    }
  }
}

const apiService = new ApiService();

export { apiService };
