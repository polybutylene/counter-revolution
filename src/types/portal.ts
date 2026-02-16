export interface ProjectStage {
  name: string;
  completedAt?: string;
  scheduledDate?: string;
}

export const PROJECT_STAGES: string[] = [
  "Quote Accepted",
  "Template/Measurement Scheduled",
  "Template Completed",
  "Material Confirmed & Sourced",
  "Fabrication In Progress",
  "Quality Inspection",
  "Installation Scheduled",
  "Installation Complete",
  "Final Walkthrough",
];

export interface PortalProject {
  _id: string;
  customerName: string;
  customerEmail: string;
  material: string;
  edgeProfile: string;
  colorPattern?: string;
  squareFootage?: number;
  estimatedCompletion?: string;
  installerFirstName?: string;
  currentStage: number;
  stages: ProjectStage[];
}

export interface ProjectMessage {
  _id: string;
  projectId: string;
  senderType: "customer" | "team";
  senderName: string;
  body: string;
  photos?: string[];
  _creationTime: number;
}
