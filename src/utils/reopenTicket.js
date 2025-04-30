// src/utils/reopenTicket.js
export const reopenTicket = async (userEmail, ticketId) => {
    const url = 'https://prod-59.eastus2.logic.azure.com:443/workflows/01576c1836f44b32abbd3177c9af94ee/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=m9yA_PWhZh3GE9swCVvlfGSgV-cV1UR5wVHS96A9uhg';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, ticketId: ticketId.toString() })
      });
  
      if (!response.ok) throw new Error('Error al reabrir el ticket');
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  