import fs from 'fs';
import readline from 'readline';

interface JSONBlock {
  index?: number;
  time?: {
    start: string;
    end: string;
  };
  content?: string;
}

/**
 * formatTime
 * @param time thời gian cần format
 */
const formatTime = (timeInput: string) => {
  const str = timeInput.replace('.', ',');
  let hour = null;
  let minute = null;
  let second = null;
  let millisecond = null;

  /* format millisecond */
  const [time, ms] = str.split(',');
  millisecond = formatDigit(3, ms);

  /* Handle hour */
  const [currentHour, currentMinute, currentSecond] = time.split(':');
  hour = formatDigit(2, currentHour, false);
  minute = formatDigit(2, currentMinute, false);
  second = formatDigit(2, currentSecond, false);

  return `${hour}:${minute}:${second},${millisecond}`;
};

/**
 * formatDigit
 * @param number số lượng chữ số cần giữ lại
 * @param str số cần format
 * @param padEnd cắt ở cuối
 */
const formatDigit = (number: number, str: string, padEnd: boolean = true) => {
  if (str.length == number) {
    return str;
  }
  if (str.length > number) {
    return str.slice(0, number);
  }
  if (str.length < number) {
    if (padEnd) {
      return str.padEnd(number, '0');
    } else {
      return str.padStart(number, '0');
    }
  }
};

/**
 *readData
 *@param data string
 *@param type 1-index 2-time 3-content
 *@param line dong bao nhieu
 *@param jsonBlock object truyen vao de lay du lieu
 */
const readData = (data: string, type: number, line: number, jsonBlock: any) => {
  switch (type) {
    case 1: {
      jsonBlock.index = data.trim();
      break;
    }
    case 2: {
      const splitBlock = data.split('-->');
      if (splitBlock.length >= 2) {
        jsonBlock.time = {};
        jsonBlock.time.start = formatTime(splitBlock[0].trim());
        jsonBlock.time.end = formatTime(splitBlock[1].trim());
      } else {
        throw 'missing time at line ' + line;
      }
      break;
    }
    case 3: {
      jsonBlock.content = (jsonBlock.content ? jsonBlock.content + ' ' : '') + data;
      break;
    }
  }
};

const processLineByLine = async (pathFile: string) => {
  /* Khai báo biến */
  let type: number = 0;
  let jsonBlock: JSONBlock = {};
  let lineIndex: number = 0;
  let endBlock: boolean = false;
  const resultJson: JSONBlock[] = [];
  /* Bắt đầu đọc từng dòng */
  const fileStream = fs.createReadStream(pathFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    lineIndex++;
    /* nếu đọc được line thì tiếp tục đọc block, không thấy line thì là kết thúc 1 block */
    if (line.trim()) {
      if (type !== 3) {
        type++;
      } else if (endBlock) {
        // block kết thúc thì reset type về 1
        type = 1;
        endBlock = false;
      }
      if (type === 1) {
        if (Object.keys(jsonBlock).length !== 0) {
          // jsonblock có data mới push vào mảng
          resultJson.push(jsonBlock);
        }
        jsonBlock = {};
      }
      readData(line, type, lineIndex, jsonBlock);
    } else {
      /* kết thúc block */
      endBlock = true;
    }
  }
  return resultJson;
};

const parser = async (filePath: string) => {
  return await processLineByLine(filePath);
};

export default parser;
