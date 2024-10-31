export interface logo {
  hover_color?: string;
}

// Type pour le logo des projets
export interface Logo {
  photo: string;
  color: string;
  link: string;
  alt: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  expiresIn: string;
}
// Type pour les projets
export interface Project {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  videoLink: string;
  logos: Logo[];
  [key: string]: any;
}

// Type pour les expériences professionnelles
export interface Experience {
  id: string;
  startDate: string;
  endDate: string;
  logo: string;
  company: string;
  title: string;
  description: string;
}

// Type pour le propriétaire (Owner)
export interface Owner {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  photo: string;
  linkedinLink?: string;
  githubLink: string;
  projects?: Project[];
  experiences?: Experience[];
}

declare module '@material-ui/core/styles' {
  interface Theme {
    customPalette: {
      lightGrey: string;
      lightGreen: string;
      darkGrey: string;
    };
  }
}
