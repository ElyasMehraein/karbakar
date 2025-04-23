import { Buffer } from 'buffer';

import axios from 'axios';
import soap from 'soap';

interface TrezSMSClientConfig {
  username: string;
  password: string;
}

interface MessageStatus {
  code: number;
  message: string;
}

interface SoapResponse {
  [key: string]: unknown;
}

interface MessageData {
  PhoneNumber: string;
  Message: string;
  Mobiles: string[];
  UserGroupId?: string;
  SendDateInTimeStamp?: number;
}

interface BatchMessageData {
  PhoneNumber: string;
  Messages: Array<{
    Number: string;
    Message: string;
  }>;
  UserGroupId?: string;
}

interface BatchMessagePortData extends BatchMessageData {
  RecievePort: string;
  SendPort: string;
}

interface MessageStatusData {
  UserGroupId: string;
}

interface BatchMessageStatusData {
  MessageIds: string[];
}

interface ReceivedMessagesData {
  PhoneNumber: string;
  From: string;
  To: string;
  Page: number;
}

class TrezSMSClient {
  private soap: typeof soap;
  private username: string;
  private password: string;
  private auth: string;
  private baseUrl: string;
  private soapUrl: string;

  constructor(username: string, password: string) {
    const buffer = Buffer.from(username + ':' + password);

    this.soap = soap;
    this.username = username;
    this.password = password;
    this.auth = 'Basic ' + buffer.toString('base64');
    this.baseUrl = 'https://smspanel.trez.ir/api/smsAPI';
    this.soapUrl = 'http://smspanel.trez.ir/FastSend.asmx?wsdl';
  }

  autoSendCode(number: string, footer: string): Promise<SoapResponse> {
    const args = {
      ReciptionNumber: number,
      Footer: footer,
    };

    return new Promise((resolve, reject) => {
      this.toSoap('AutoSendCode', args)
        .then((result: SoapResponse) => {
          resolve(result.AutoSendCodeResult as SoapResponse);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  manualSendCode(number: string, textWithCode: string): Promise<SoapResponse> {
    const args = {
      ReciptionNumber: number,
      Code: textWithCode,
    };

    return new Promise((resolve, reject) => {
      this.toSoap('SendMessageWithCode', args)
        .then((result: SoapResponse) => {
          resolve(result.SendMessageWithCodeResult as SoapResponse);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  checkCode(number: string, userCode: string): Promise<boolean> {
    const args = {
      Username: this.username,
      Password: this.password,
      ReciptionNumber: number,
      Code: userCode,
    };

    return new Promise((resolve, reject) => {
      this.toSoap('CheckSendCode', args)
        .then((result: SoapResponse) => {
          resolve(result.CheckSendCodeResult === true);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  sendMessage(
    sender: string,
    numbers: string | string[],
    message: string,
    groupId?: string,
    time?: number
  ): Promise<SoapResponse> {
    time = time || this.getCurrentTimestamp();

    if (!Array.isArray(numbers) && typeof numbers === 'string') {
      numbers = numbers.split(',');
    }

    const data: MessageData = {
      PhoneNumber: sender,
      Message: message,
      Mobiles: numbers,
      UserGroupId: groupId,
      SendDateInTimeStamp: time,
    };

    return new Promise((resolve, reject) => {
      this.to('send', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  sendBatchMessage(
    sender: string,
    numbersMessage: Array<{ Number: string; Message: string }>,
    groupId?: string
  ): Promise<SoapResponse> {
    const data: BatchMessageData = {
      PhoneNumber: sender,
      Messages: numbersMessage,
      UserGroupId: groupId,
    };

    return new Promise((resolve, reject) => {
      this.to('sendBatch', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  sendBatchMessageToPort(
    sender: string,
    recievePort: string,
    sendPort: string,
    numbersMessage: Array<{ Number: string; Message: string }>,
    groupId?: string
  ): Promise<SoapResponse> {
    const data: BatchMessagePortData = {
      PhoneNumber: sender,
      RecievePort: recievePort,
      SendPort: sendPort,
      Messages: numbersMessage,
      UserGroupId: groupId,
    };

    return new Promise((resolve, reject) => {
      this.to('sendBatchToPort', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  messageStatus(groupId: string): Promise<SoapResponse> {
    const data: MessageStatusData = {
      UserGroupId: groupId,
    };

    return new Promise((resolve, reject) => {
      this.to('messageStatus', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  batchMessageStatus(messageIds: string[]): Promise<SoapResponse> {
    const data: BatchMessageStatusData = {
      MessageIds: messageIds,
    };

    return new Promise((resolve, reject) => {
      this.to('batchMessageStatus', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  receivedMessages(
    receiver: string,
    from: string,
    to: string,
    page: number
  ): Promise<SoapResponse> {
    const data: ReceivedMessagesData = {
      PhoneNumber: receiver,
      From: from,
      To: to,
      Page: page,
    };

    return new Promise((resolve, reject) => {
      this.to('receivedMessages', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  accountCredit(): Promise<SoapResponse> {
    return new Promise((resolve, reject) => {
      this.to('accountCredit', {}, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  prices(): Promise<SoapResponse> {
    return new Promise((resolve, reject) => {
      this.to('prices', {}, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  checkBlackList(numbers: string[]): Promise<SoapResponse> {
    const data = {
      Numbers: numbers,
    };

    return new Promise((resolve, reject) => {
      this.to('checkBlackList', data, 'POST')
        .then((result: SoapResponse) => {
          resolve(result);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  private createRecipientObject(
    id: string,
    number: string,
    message: string
  ): { Number: string; Message: string } {
    return {
      Number: number,
      Message: message,
    };
  }

  private to(endpoint: string, data: unknown, method: string): Promise<SoapResponse> {
    const url = this.baseUrl + '/' + endpoint;
    return this.makeRequest(url, method, data);
  }

  private toSoap(method: string, data: unknown): Promise<SoapResponse> {
    return new Promise((resolve, reject) => {
      this.soap.createClient(this.soapUrl, (err: Error | null, client: soap.Client) => {
        if (err) {
          reject(err);
          return;
        }

        client[method](data, (err: Error | null, result: SoapResponse) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  }

  private makeRequest(url: string, method: string, data: unknown): Promise<SoapResponse> {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        headers: {
          Authorization: this.auth,
          'Content-Type': 'application/json',
        },
        data,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  }

  private getRandomGroupId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private getCurrentTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }

  private getMessageStatus(code: number): MessageStatus {
    return {
      code,
      message: this.getCodeMessage(code),
    };
  }

  private getCodeMessage(code: number): string {
    const messages: Record<number, string> = {
      0: 'پیام با موفقیت ارسال شد',
      1: 'نام کاربری یا رمز عبور اشتباه است',
      2: 'اعتبار کافی نیست',
      3: 'محدودیت در ارسال روزانه',
      4: 'محدودیت در ارسال حجمی',
      5: 'شماره فرستنده معتبر نیست',
      6: 'متن پیام خالی است',
      7: 'متن پیام بیش از حد مجاز است',
      8: 'شماره موبایل معتبر نیست',
      9: 'شماره موبایل در لیست سیاه است',
      10: 'محدودیت در ارسال به این شماره',
      11: 'محدودیت در ارسال به این منطقه',
      12: 'محدودیت در ارسال به این اپراتور',
      13: 'محدودیت در ارسال به این کد',
      14: 'محدودیت در ارسال به این پیش شماره',
      15: 'محدودیت در ارسال به این شماره',
      16: 'محدودیت در ارسال به این شماره',
      17: 'محدودیت در ارسال به این شماره',
      18: 'محدودیت در ارسال به این شماره',
      19: 'محدودیت در ارسال به این شماره',
      20: 'محدودیت در ارسال به این شماره',
      21: 'محدودیت در ارسال به این شماره',
      22: 'محدودیت در ارسال به این شماره',
      23: 'محدودیت در ارسال به این شماره',
      24: 'محدودیت در ارسال به این شماره',
      25: 'محدودیت در ارسال به این شماره',
      26: 'محدودیت در ارسال به این شماره',
      27: 'محدودیت در ارسال به این شماره',
      28: 'محدودیت در ارسال به این شماره',
      29: 'محدودیت در ارسال به این شماره',
      30: 'محدودیت در ارسال به این شماره',
      31: 'محدودیت در ارسال به این شماره',
      32: 'محدودیت در ارسال به این شماره',
      33: 'محدودیت در ارسال به این شماره',
      34: 'محدودیت در ارسال به این شماره',
      35: 'محدودیت در ارسال به این شماره',
      36: 'محدودیت در ارسال به این شماره',
      37: 'محدودیت در ارسال به این شماره',
      38: 'محدودیت در ارسال به این شماره',
      39: 'محدودیت در ارسال به این شماره',
      40: 'محدودیت در ارسال به این شماره',
      41: 'محدودیت در ارسال به این شماره',
      42: 'محدودیت در ارسال به این شماره',
      43: 'محدودیت در ارسال به این شماره',
      44: 'محدودیت در ارسال به این شماره',
      45: 'محدودیت در ارسال به این شماره',
      46: 'محدودیت در ارسال به این شماره',
      47: 'محدودیت در ارسال به این شماره',
      48: 'محدودیت در ارسال به این شماره',
      49: 'محدودیت در ارسال به این شماره',
      50: 'محدودیت در ارسال به این شماره',
    };

    return messages[code] || 'خطای ناشناخته';
  }
}

export default TrezSMSClient;
