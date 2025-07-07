import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "./components/ui/table";

const App = () => {
  const [servers, setServers] = useState([]);
  const [selectedServers, setSelectedServers] = useState([]);
  const [patchSummary, setPatchSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);
    setSelectedServers([]);
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "Server A", cves: ["CVE-123", "CVE-456"], needPatch: true, needReboot: true },
        { id: 2, name: "Server B", cves: ["CVE-789"], needPatch: false, needReboot: false },
      ];
      setServers(mockData);
      setLoading(false);
    }, 1000);
  };

  const handleCheckboxChange = (server) => {
    setSelectedServers((prev) =>
      prev.includes(server)
        ? prev.filter((s) => s !== server)
        : [...prev, server]
    );
  };

  const handlePatch = () => {
    const results = selectedServers.map((server) => ({
      server: server.name,
      cves: server.cves,
      success: Math.random() > 0.3,
      needReboot: server.needReboot,
    }));
    setPatchSummary((prev) => [...prev, ...results]);
  };

  const handleReboot = (serverName) => {
    alert(`Rebooting ${serverName}`);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Security Dashboard</h1>
      <div className="mb-3">
        <Button onClick={handleScan}>Scan</Button>{" "}
        <Button onClick={handlePatch} disabled={selectedServers.length === 0}>Run Patch</Button>
      </div>

      <Card>
        <h5 className="card-title">Servers Requiring Patch</h5>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>Server</TableCell>
                  <TableCell>CVE(s)</TableCell>
                  <TableCell>Need Patch</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedServers.includes(server)}
                        onCheckedChange={() => handleCheckboxChange(server)}
                        disabled={!server.needPatch}
                      />
                    </TableCell>
                    <TableCell>{server.name}</TableCell>
                    <TableCell>{server.cves.join(", ")}</TableCell>
                    <TableCell>{server.needPatch ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>

      <Card>
        <h5 className="card-title">Patch Summary</h5>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Server</TableCell>
                <TableCell>CVE(s)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Need Reboot</TableCell>
                <TableCell>Reboot</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patchSummary.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.server}</TableCell>
                  <TableCell>{result.cves.join(", ")}</TableCell>
                  <TableCell>{result.success ? "Success" : "Failed"}</TableCell>
                  <TableCell>{result.needReboot ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {result.needReboot && (
                      <Button size="sm" onClick={() => handleReboot(result.server)}>
                        Reboot
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
