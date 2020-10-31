// we can use the index.ts file as kind of a central export point for
// everything inside the action directory.
// now if we wanted to access to any files in the action directory,
// we just need to import './action' directory.
export * from './news';
export * from './types';
