export interface ICourse {
  id?: number;
  name?: string;
  duration?: number;
  topId?: number;
  departmentId?: number | null;
  department?: {
    id?: number;
    name?: string;
    loc?: string;
  } | null;
  courseDesc?: string;
}
