
export interface userToRecruitLikeService {
  add: (recruitId: string) => Promise<void>,
  delete: (id: string) => Promise<void>
}