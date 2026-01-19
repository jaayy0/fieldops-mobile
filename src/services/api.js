const API_BASE_URL = "http://192.168.1.13:8080";

export const createIncident = async (data) => {
    const response = await fetch(`${API_BASE_URL}/incidents/create-incident`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error creating incident");
    }

    return response.json();
};

export const getIncidents = async () => {
    const response = await fetch(`${API_BASE_URL}/incidents/get-incidents`);
    return response.json();
};
