export const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;
