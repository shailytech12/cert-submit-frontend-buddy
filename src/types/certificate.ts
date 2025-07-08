
export interface Certificate {
  id: number;
  name: string;
  status: "Completed" | "Pending" | "In Progress" | "Not Started";
  dueDate: string;
  priority: "low" | "medium" | "high";
  description: string;
  submissions: Submission[];
}

export interface Submission {
  date: string;
  office: string;
  status: string;
}
