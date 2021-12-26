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
<<<<<<< Updated upstream
  viewApplication: IApplication | null;
  viewApplications: IApplication[] | null;
  archiveApplication: IApplication | null;
  updatedApplicationStatus: IApplication | null;
=======
  application: IApplication | null;
  applications: IApplication[] | null;
  archiveApplications: IApplication | null;
  updatedApplication: IApplication | null;
  selectedApplicationId: IApplication | null;
  deletedApplication: IApplication | null;
>>>>>>> Stashed changes
  loading: boolean;
  error: string | null;
}

export type { IApplicationState, IApplication };
