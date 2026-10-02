export const generateEvents = () => {
  const events = [];
  const severities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Open", "Investigating", "Closed"];
  const protocols = ["TCP", "UDP", "HTTPS", "ICMP"];
  const types = ["Port Scan", "Malware Traffic", "DDoS Attempt", "Unauthorized Login", "Brute Force"];

  for (let i = 1; i <= 300; i++) {
    // Generate dates within the last 30 days
    const randomTimeOffset = Math.random() * 30 * 24 * 60 * 60 * 1000;
    
    events.push({
      id: `EVT-${String(i).padStart(3, "0")}`,
      timestamp: new Date(Date.now() - randomTimeOffset).toISOString(),
      source: `10.10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      destination: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      eventType: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      riskScore: Math.floor(Math.random() * 100)
    });
  }
  return events;
};