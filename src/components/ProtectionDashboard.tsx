import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, AlertTriangle, FolderLock, Activity, Settings, Trash2, RefreshCw } from "lucide-react";

interface ProtectionStatus {
  isActive: boolean;
  protectedFolders: string[];
  recentBlocks: Array<{
    id: string;
    file: string;
    type: "delete" | "move";
    timestamp: Date;
    restored: boolean;
  }>;
  backupCount: number;
}

const ProtectionDashboard = () => {
  const [protectionStatus, setProtectionStatus] = useState<ProtectionStatus>({
    isActive: true,
    protectedFolders: ["Desktop", "Documents", "Downloads"],
    recentBlocks: [
      {
        id: "1",
        file: "important-app.exe",
        type: "delete",
        timestamp: new Date(Date.now() - 300000),
        restored: true
      },
      {
        id: "2", 
        file: "project-folder",
        type: "move",
        timestamp: new Date(Date.now() - 600000),
        restored: true
      },
      {
        id: "3",
        file: "config.txt",
        type: "delete", 
        timestamp: new Date(Date.now() - 900000),
        restored: false
      }
    ],
    backupCount: 247
  });

  const toggleProtection = () => {
    setProtectionStatus(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-shield-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-shield-primary to-shield-secondary bg-clip-text text-transparent">
              File Protection Manager
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced file system protection with real-time monitoring and automatic backup recovery
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-card to-card/50 border-shield-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protection Status</CardTitle>
              <Shield className={`h-4 w-4 ${protectionStatus.isActive ? 'text-shield-primary' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {protectionStatus.isActive ? "Active" : "Disabled"}
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-muted-foreground">
                  {protectionStatus.isActive ? "Real-time monitoring enabled" : "Click to enable protection"}
                </p>
                <Switch
                  checked={protectionStatus.isActive}
                  onCheckedChange={toggleProtection}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-warning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Actions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{protectionStatus.recentBlocks.length}</div>
              <p className="text-xs text-muted-foreground mt-4">
                Files protected from deletion today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Backup Files</CardTitle>
              <FolderLock className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{protectionStatus.backupCount}</div>
              <p className="text-xs text-muted-foreground mt-4">
                Files safely backed up
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Protected Folders */}
          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderLock className="h-5 w-5 text-shield-primary" />
                Protected Folders
              </CardTitle>
              <CardDescription>
                Folders currently under protection monitoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {protectionStatus.protectedFolders.map((folder, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <FolderLock className="h-4 w-4 text-shield-primary" />
                    <span className="font-medium">{folder}</span>
                  </div>
                  <Badge variant="secondary" className="bg-shield-primary/10 text-shield-primary">
                    Protected
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Settings className="h-4 w-4 mr-2" />
                Manage Folders
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-warning" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest blocked deletion attempts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {protectionStatus.recentBlocks.map((block) => (
                <div key={block.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${block.type === 'delete' ? 'bg-danger/10' : 'bg-warning/10'}`}>
                      <Trash2 className={`h-3 w-3 ${block.type === 'delete' ? 'text-danger' : 'text-warning'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{block.file}</p>
                      <p className="text-xs text-muted-foreground">
                        {block.type === 'delete' ? 'Deletion blocked' : 'Move blocked'} • {formatTimeAgo(block.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {block.restored && (
                      <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                        Restored
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="shield" size="lg" className="min-w-48">
            <Shield className="h-5 w-5 mr-2" />
            Force Backup Scan
          </Button>
          <Button variant="outline" size="lg">
            <Settings className="h-5 w-5 mr-2" />
            Protection Settings
          </Button>
          <Button variant="warning" size="lg">
            <Trash2 className="h-5 w-5 mr-2" />
            Manage Backups
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProtectionDashboard;