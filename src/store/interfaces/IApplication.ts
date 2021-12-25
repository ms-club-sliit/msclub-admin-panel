import { IModifiedBy } from "./index";

interface IApplication {
  studentId : string;
  name : string;
  email : string
  contactNumber : string;
  currentAcademicYear : string;
  selfIntroduction : string;
  reasonForJoin : string;
  linkedIn : string;
  gitHub : string;
  blog ?: string;
  experiences ?: string;
  challenges ?: string;
  goal : string;
  skillsAndTalents : string[];
  pastWork ?: string;
  deletedAt ?: Date;
  status : string;
  createdBy: IModifiedBy;
  updatedBy: IModifiedBy[];
  deletedBy?: IModifiedBy;
}

// State Interface
interface IApplicationState {
  viewApplication: IApplication | null;
  viewApplications: IApplication[] | null;
  archiveApplication: IApplication | null;
  updatedApplicationStatus: IApplication | null;
  loading: boolean;
  error: string | null;
}

export type { IApplicationState, IApplication };
