export interface recruitParticipantService {
  applyForJoin: (recruitId: string) => Promise<void>;
  approve: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
};