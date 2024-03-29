export interface TodoDto {
  name: string | any;
  id?: any;
  isActive: boolean;
  tasks?: TaskDto[] | any;
  isCompleted?: boolean;
  description: string | any;
}

export interface TaskDto {
  name: string | any;
  id?: number | any;
  todo: number | any;
  isActive: boolean;
}
