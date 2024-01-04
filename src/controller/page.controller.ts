// src/controller/page.controller.ts

import { apiService } from "../service/api.service.js";

class PageController {
  async startProcess(
    method: string,
    params: any
  ): Promise<{ message: string }> {
    try {
      const response = await apiService.sendJsonRpcRequest(method, params);
      console.log("RHEEE ", JSON.stringify(response.status) == "7001")
      console.log(JSON.stringify(response.status))
      if (JSON.stringify(response.status).includes("7001"))
        return {
          message:
            "Process started successfully!\n" +
            "Statuscode: " +
            JSON.stringify(response.status) +
            "\n" +
            JSON.stringify(response.header),
        };
      if (JSON.stringify(response.status).includes("7100"))
        return {
          message:
            "Process already started!\n" +
            "Statuscode: " +
            JSON.stringify(response.status),
        };
      return {
        message: "Cannot run the process!",
      };
    } catch (error) {
      console.error("Error starting process:", error);
      throw error;
    }
  }

  async getResult(): Promise<any> {
    const method = "result_request";
    const params = ["World!"]; // Adjust parameters if needed

    try {
      const response = await apiService.sendJsonRpcRequest(method, params);
      return { message: JSON.stringify(response.data) };
    } catch (error) {
      throw error;
    }
  }

  private displayResult(data: any): void {
    const dynamicContent = document.getElementById("dynamic-content");
    if (dynamicContent) {
      // Clear previous content
      dynamicContent.innerHTML = "";

      // Create a textarea element dynamically
      const dataField = document.createElement("textarea");
      dataField.id = "dynamic-data-field";
      dataField.rows = 10;
      dataField.cols = 30;
      dataField.value = JSON.stringify(data, null, 2); // Format the data for better readability

      // Append the textarea to the dynamic-content div
      dynamicContent.appendChild(dataField);
    }
  }

  private displayError(error: any): void {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.innerText = `Error: ${error.message}`;
    }
  }
}

const pageController = new PageController();
export { pageController };
