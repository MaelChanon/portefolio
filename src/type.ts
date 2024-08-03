export type Icon = {
  path: string
  alt: string
  color: string
  link: string
}
export type ProjectItem = {
  video_path: string
  project_title: string
  project_description: string
  project_link: string
  technologies?: Array<Icon>
  left_description: boolean
  slide_in_left: boolean
}

export type logo = {
  hover_color?: string
}
