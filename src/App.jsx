import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const serversMock = [
  { id: 1, name: "Server A", os: "Ubuntu 22.04", needsPatch: true, cves: ["CVE-2024-12345"] },
  { id: 2, name: "Server B", os: "CentOS 8", needsPatch: true, cves: ["CVE-2024-67890"] },
  { id: 3, name: "Server C", os: "Debian 11", needsPatch: false, cves: [] },
];

const Dashboard = () => {
  const [patchResult, setPatchResult] = useState(null);
  const [selectedServers, setSelectedServers] = useState([]);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patchSummary, setPatchSummary] = useState([]);

  const handleScan = () => {
    setLoading(true);
    setServers([]);
    setSelectedServers([]);
    setTimeout(() => {
      setServers(serversMock);
      setLoading(false);
    }, 1500);
  };

  const handleRunPatch = () => {
    const summary = selectedServers.map((serverName) => {
      const server = servers.find((s) => s.name === serverName);
      return {
        server: serverName,
        cves: server?.cves || [],
        cvesToPatch: server?.cves || [],
        status: Math.random() < 0.8 ? "Success" : "Failed",
        needReboot: true,
      };
    });
    setPatchSummary((prev) => [...prev, ...summary]);
    const successful = summary.filter((s) => s.status === "Success").map((s) => s.server);
    setPatchResult(
      `Patch applied to: ${successful.join(", ")}. CVEs mitigated.`
    );
  };

  const handleCheckboxChange = (serverName) => {
    setSelectedServers((prev) =>
      prev.includes(serverName)
        ? prev.filter((s) => s !== serverName)
        : [...prev, serverName]
    );
  };

  const handleReboot = (serverName) => {
    alert(`Rebooting ${serverName}...`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Security Dashboard</h1>
      <div className="flex space-x-4">
        <Button onClick={handleScan}>Scan</Button>
        <Button onClick={handleRunPatch} disabled={selectedServers.length === 0}>
          Run Patch
        </Button>
      </div>
      <Card className="mt-4">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Servers Requiring Patch</h2>
          <div className="max-h-64 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="border-b">
                  <TableCell className="py-2 px-4 font-semibold">Select</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">Name</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">OS</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">Needs Patch</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">CVEs</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-gray-500 text-center">Scanning servers...</TableCell>
                  </TableRow>
                ) : servers.length > 0 ? (
                  servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="py-2 px-4">
                        <Checkbox
                          checked={selectedServers.includes(server.name)}
                          onCheckedChange={() => handleCheckboxChange(server.name)}
                          disabled={!server.needsPatch}
                        />
                      </TableCell>
                      <TableCell className="py-2 px-4">{server.name}</TableCell>
                      <TableCell className="py-2 px-4">{server.os}</TableCell>
                      <TableCell className="py-2 px-4">{server.needsPatch ? "Yes" : "No"}</TableCell>
                      <TableCell className="py-2 px-4">{server.cves.join(", ")}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-gray-500 text-center">
                      No scan results. Please click "Scan" to begin.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Patch Summary</h2>
          <div className="max-h-64 overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow className="border-b">
                  <TableCell className="py-2 px-4 font-semibold">Server</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">CVEs Needed Patch</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">Status</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">Need Reboot</TableCell>
                  <TableCell className="py-2 px-4 font-semibold">Reboot</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patchSummary.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-gray-500 text-center">No patch operations have been run yet.</TableCell>
                  </TableRow>
                ) : (
                  patchSummary.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-2 px-4">{item.server}</TableCell>
                      <TableCell className="py-2 px-4">{item.cvesToPatch.join(", ")}</TableCell>
                      <TableCell className={`py-2 px-4 ${item.status === "Success" ? "text-green-600" : "text-red-600"}`}>{item.status}</TableCell>
                      <TableCell className="py-2 px-4">{item.needReboot ? "Yes" : "No"}</TableCell>
                      <TableCell className="py-2 px-4">
                        <Button size="sm" onClick={() => handleReboot(item.server)}>Reboot</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {patchResult && (
        <Card className="mt-4">
          <CardContent>
            <p className="text-green-600 font-medium mb-4">{patchResult}</p>
          </CardContent>
        </Card>
      )}
    </div>
    
  );
};

export default Dashboard;
