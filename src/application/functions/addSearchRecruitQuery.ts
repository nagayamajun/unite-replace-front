
export const addSearchRecruitQuery = (search?: string) => {
  switch (true) {
    case !!search:
      return `/homeScreen/?search=${search}`;
    
    default:
      return '/homeScreen'
  }
}