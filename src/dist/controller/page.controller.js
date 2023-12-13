// src/controller/page.controller.ts
import { apiService } from "../service/api.service.js";
class PageController {
    async startProcess(method, params) {
        try {
            const response = await apiService.sendJsonRpcRequest(method, params);
            return { message: "Process started successfully!\n" + JSON.stringify(response.status) + "\n" + JSON.stringify(response.header) }; // Update with the actual response structure
        }
        catch (error) {
            console.error("Error starting process:", error);
            throw error;
        }
    }
    async getResult() {
        const method = 'result_request';
        const params = ["World!"]; // Adjust parameters if needed
        try {
            const response = await apiService.sendJsonRpcRequest(method, params);
            return { message: JSON.stringify(response.data) };
        }
        catch (error) {
            throw error;
        }
    }
    displayResult(data) {
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
    displayError(error) {
        const errorMessage = document.getElementById("error-message");
        if (errorMessage) {
            errorMessage.innerText = `Error: ${error.message}`;
        }
    }
}
const pageController = new PageController();
export { pageController };