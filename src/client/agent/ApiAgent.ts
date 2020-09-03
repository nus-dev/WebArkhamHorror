class ApiAgent {
    public get(url: string): Promise<void> {
        return null;
    }

    public post(url: string, data?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onerror = (e) => reject(e);
            xhr.onload = () => {
                (xhr.status === 200) ? resolve() : reject(xhr.status);
            };
            
            xhr.send(JSON.stringify(data));
        });
    }
}

export default new ApiAgent();