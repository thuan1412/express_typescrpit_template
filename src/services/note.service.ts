import { TextOperation } from "ot";

const applyChange = (currentStr: string, operations: TextOperation[]) => {
  let newStr = currentStr;
  console.log("received operation ", operations);
  for (const operation of operations) {
    const ops = operation.ops;
    const textOperation = new TextOperation();
    console.log(newStr.length);
    console.log(textOperation);
    textOperation.ops = ops;
    textOperation.baseLength = operation.baseLength;
    textOperation.targetLength = operation.targetLength;
    newStr = textOperation.apply(newStr);
  }
  return newStr;
};

export default {
  applyChange,
};
