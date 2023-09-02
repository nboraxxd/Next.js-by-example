export interface SuccessResponse<Data> {
  data: Data[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
