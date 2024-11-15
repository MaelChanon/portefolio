/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * media fied
     */
    media<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "mediaField";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * media fied
     */
    media<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "mediaField";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  DeleteWhereInput: { // input type
    id?: number | null; // Int
  }
  LogoWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UpdateLogoInput: { // input type
    alt?: string | null; // String
    color?: string | null; // String
    link?: string | null; // String
    photo?: NexusGenInputs['fileInput'] | null; // fileInput
  }
  UpdateOwnerInput: { // input type
    base64?: string | null; // String
    firstname?: string | null; // String
    githubLink?: string | null; // String
    lastname?: string | null; // String
    linkedinLink?: string | null; // String
    photo?: NexusGenInputs['fileInput'] | null; // fileInput
    role?: string | null; // String
  }
  UpdateProjectInput: { // input type
    description?: string | null; // String
    githubLink?: string | null; // String
    logos?: Array<number | null> | null; // [Int]
    name?: string | null; // String
    order?: number | null; // Int
    videoLink?: NexusGenInputs['fileInput'] | null; // fileInput
  }
  fileInput: { // input type
    base64?: string | null; // String
    name?: string | null; // String
    type?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  mediaField: any
}

export interface NexusGenObjects {
  Experience: { // root type
    compagny: string; // String!
    description: string; // String!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    logo: NexusGenScalars['mediaField']; // mediaField!
    ownerId: number; // Int!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
  }
  LoginResponse: { // root type
    expiresIn?: string | null; // String
    success?: boolean | null; // Boolean
    token?: string | null; // String
  }
  Logo: { // root type
    alt: string; // String!
    color: string; // String!
    id: number; // Int!
    link: string; // String!
    photo: NexusGenScalars['mediaField']; // mediaField!
  }
  Mutation: {};
  Owner: { // root type
    firstname: string; // String!
    githubLink: string; // String!
    id: number; // Int!
    lastname: string; // String!
    linkedinLink: string; // String!
    photo: NexusGenScalars['mediaField']; // mediaField!
    role: string; // String!
  }
  Project: { // root type
    description: string; // String!
    githubLink: string; // String!
    id: number; // Int!
    name: string; // String!
    order: number; // Int!
    ownerId: number; // Int!
    videoLink: NexusGenScalars['mediaField']; // mediaField!
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Experience: { // field return type
    compagny: string; // String!
    description: string; // String!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    logo: NexusGenScalars['mediaField']; // mediaField!
    owner: NexusGenRootTypes['Owner']; // Owner!
    ownerId: number; // Int!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    title: string; // String!
  }
  LoginResponse: { // field return type
    expiresIn: string | null; // String
    success: boolean | null; // Boolean
    token: string | null; // String
  }
  Logo: { // field return type
    alt: string; // String!
    color: string; // String!
    id: number; // Int!
    link: string; // String!
    photo: NexusGenScalars['mediaField']; // mediaField!
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
  }
  Mutation: { // field return type
    createProject: NexusGenRootTypes['Project'] | null; // Project
    deleteOneLogo: NexusGenRootTypes['Logo'] | null; // Logo
    login: NexusGenRootTypes['LoginResponse'] | null; // LoginResponse
    updateLogo: NexusGenRootTypes['Logo'] | null; // Logo
    updateOwner: NexusGenRootTypes['Owner'] | null; // Owner
    updateProject: NexusGenRootTypes['Project'] | null; // Project
    updateProjectLogo: boolean | null; // Boolean
  }
  Owner: { // field return type
    experiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    firstname: string; // String!
    githubLink: string; // String!
    id: number; // Int!
    lastname: string; // String!
    linkedinLink: string; // String!
    photo: NexusGenScalars['mediaField']; // mediaField!
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
    role: string; // String!
  }
  Project: { // field return type
    description: string; // String!
    githubLink: string; // String!
    id: number; // Int!
    logos: NexusGenRootTypes['Logo'][]; // [Logo!]!
    name: string; // String!
    order: number; // Int!
    owner: NexusGenRootTypes['Owner']; // Owner!
    ownerId: number; // Int!
    videoLink: NexusGenScalars['mediaField']; // mediaField!
  }
  Query: { // field return type
    ME: string | null; // String
    experiences: NexusGenRootTypes['Experience'][]; // [Experience!]!
    logos: NexusGenRootTypes['Logo'][]; // [Logo!]!
    owner: NexusGenRootTypes['Owner'] | null; // Owner
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
  }
}

export interface NexusGenFieldTypeNames {
  Experience: { // field return type name
    compagny: 'String'
    description: 'String'
    endDate: 'DateTime'
    id: 'Int'
    logo: 'mediaField'
    owner: 'Owner'
    ownerId: 'Int'
    startDate: 'DateTime'
    title: 'String'
  }
  LoginResponse: { // field return type name
    expiresIn: 'String'
    success: 'Boolean'
    token: 'String'
  }
  Logo: { // field return type name
    alt: 'String'
    color: 'String'
    id: 'Int'
    link: 'String'
    photo: 'mediaField'
    projects: 'Project'
  }
  Mutation: { // field return type name
    createProject: 'Project'
    deleteOneLogo: 'Logo'
    login: 'LoginResponse'
    updateLogo: 'Logo'
    updateOwner: 'Owner'
    updateProject: 'Project'
    updateProjectLogo: 'Boolean'
  }
  Owner: { // field return type name
    experiences: 'Experience'
    firstname: 'String'
    githubLink: 'String'
    id: 'Int'
    lastname: 'String'
    linkedinLink: 'String'
    photo: 'mediaField'
    projects: 'Project'
    role: 'String'
  }
  Project: { // field return type name
    description: 'String'
    githubLink: 'String'
    id: 'Int'
    logos: 'Logo'
    name: 'String'
    order: 'Int'
    owner: 'Owner'
    ownerId: 'Int'
    videoLink: 'mediaField'
  }
  Query: { // field return type name
    ME: 'String'
    experiences: 'Experience'
    logos: 'Logo'
    owner: 'Owner'
    projects: 'Project'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createProject: { // args
      data?: NexusGenInputs['UpdateProjectInput'] | null; // UpdateProjectInput
    }
    deleteOneLogo: { // args
      where: NexusGenInputs['LogoWhereUniqueInput']; // LogoWhereUniqueInput!
    }
    login: { // args
      password?: string | null; // String
    }
    updateLogo: { // args
      data?: NexusGenInputs['UpdateLogoInput'] | null; // UpdateLogoInput
      id?: number | null; // Int
    }
    updateOwner: { // args
      data?: NexusGenInputs['UpdateOwnerInput'] | null; // UpdateOwnerInput
      id: number; // Int!
    }
    updateProject: { // args
      data?: NexusGenInputs['UpdateProjectInput'] | null; // UpdateProjectInput
      id: number; // Int!
    }
    updateProjectLogo: { // args
      data: Array<number | null>; // [Int]!
      id: number; // Int!
    }
  }
  Query: {
    owner: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}