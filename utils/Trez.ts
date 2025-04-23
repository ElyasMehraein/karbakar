import axios from 'axios';
import soap from 'soap';
import { Buffer } from 'buffer';

interface TrezSMSClientConfig {
    username: string;
    password: string;
}

interface MessageStatus {
    code: number;
    message: string;
}

class TrezSMSClient {
    private soap: any;
    private username: string;
    private password: string;
    private auth: string;
    private baseUrl: string;
    private soapUrl: string;

    constructor(username: string, password: string) {
        let buffer = Buffer.from(username + ":" + password);

        this.soap = soap;
        this.username = username;
        this.password = password;
        this.auth = "Basic " + buffer.toString("base64");
        this.baseUrl = "https://smspanel.trez.ir/api/smsAPI";
        this.soapUrl = "http://smspanel.trez.ir/FastSend.asmx?wsdl";
    }

    autoSendCode(number: string, footer: string): Promise<any> {
        const args = {
            ReciptionNumber: number,
            Footer: footer
        };

        return new Promise((resolve, reject) => {
            this
                .toSoap("AutoSendCode", args)
                .then((result: any) => {
                    resolve(result.AutoSendCodeResult);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    manualSendCode(number: string, textWithCode: string): Promise<any> {
        const args = {
            ReciptionNumber: number,
            Code: textWithCode
        };

        return new Promise((resolve, reject) => {
            this
                .toSoap("SendMessageWithCode", args)
                .then((result: any) => {
                    resolve(result.SendMessageWithCodeResult);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    checkCode(number: string, userCode: string): Promise<boolean> {
        const args = {
            Username: this.username,
            Password: this.password,
            ReciptionNumber: number,
            Code: userCode
        };

        return new Promise((resolve, reject) => {
            this
                .toSoap("CheckSendCode", args)
                .then((result: any) => {
                    resolve(result.CheckSendCodeResult == true);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    sendMessage(sender: string, numbers: string | string[], message: string, groupId?: string, time?: number): Promise<any> {
        time = time || this.getCurrentTimestamp();

        if (!Array.isArray(numbers) && typeof numbers == "string") {
            numbers = numbers.split(",");
        }

        const data = {
            "PhoneNumber": sender,
            "Message": message,
            "Mobiles": numbers,
            "UserGroupId": groupId,
            "SendDateInTimeStamp": time
        };

        return new Promise((resolve, reject) => {
            this
                .to("send", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    sendBatchMessage(sender: string, numbersMessage: any[], groupId?: string): Promise<any> {
        const data = {
            "PhoneNumber": sender,
            "Messages": numbersMessage,
            "UserGroupId": groupId
        };

        return new Promise((resolve, reject) => {
            this
                .to("sendBatch", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    sendBatchMessageToPort(sender: string, recievePort: string, sendPort: string, numbersMessage: any[], groupId?: string): Promise<any> {
        const data = {
            "PhoneNumber": sender,
            "RecievePort": recievePort,
            "SendPort": sendPort,
            "Messages": numbersMessage,
            "UserGroupId": groupId
        };

        return new Promise((resolve, reject) => {
            this
                .to("sendBatchToPort", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    messageStatus(groupId: string): Promise<any> {
        const data = {
            "UserGroupId": groupId
        };

        return new Promise((resolve, reject) => {
            this
                .to("messageStatus", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    batchMessageStatus(messageIds: string[]): Promise<any> {
        const data = {
            "MessageIds": messageIds
        };

        return new Promise((resolve, reject) => {
            this
                .to("batchMessageStatus", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    receivedMessages(receiver: string, from: string, to: string, page: number): Promise<any> {
        const data = {
            "PhoneNumber": receiver,
            "From": from,
            "To": to,
            "Page": page
        };

        return new Promise((resolve, reject) => {
            this
                .to("receivedMessages", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    accountCredit(): Promise<any> {
        return new Promise((resolve, reject) => {
            this
                .to("accountCredit", {}, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    prices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this
                .to("prices", {}, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    checkBlackList(numbers: string[]): Promise<any> {
        const data = {
            "Numbers": numbers
        };

        return new Promise((resolve, reject) => {
            this
                .to("checkBlackList", data, "POST")
                .then((result: any) => {
                    resolve(result);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    private createRecipientObject(id: string, number: string, message: string): any {
        return {
            "Id": id,
            "Number": number,
            "Message": message
        };
    }

    private to(endpoint: string, data: any, method: string): Promise<any> {
        return this.makeRequest(this.baseUrl + "/" + endpoint, method, data);
    }

    private toSoap(method: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.soap.createClient(this.soapUrl, (err: any, client: any) => {
                if (err) {
                    reject(err);
                    return;
                }

                client[method](data, (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                });
            });
        });
    }

    private makeRequest(url: string, method: string, data: any): Promise<any> {
        return axios({
            method: method,
            url: url,
            headers: {
                "Authorization": this.auth,
                "Content-Type": "application/json"
            },
            data: data
        }).then((response: any) => {
            return response.data;
        });
    }

    private getRandomGroupId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private getCurrentTimestamp(): number {
        return Math.floor(Date.now() / 1000);
    }

    private getMessageStatus(code: number): MessageStatus {
        const status: { [key: number]: MessageStatus } = {
            0: { code: 0, message: "ارسال شده" },
            1: { code: 1, message: "در صف ارسال" },
            2: { code: 2, message: "ارسال نشده" },
            3: { code: 3, message: "خطا" },
            4: { code: 4, message: "نامشخص" },
            5: { code: 5, message: "ارسال شده به مخابرات" },
            6: { code: 6, message: "ارسال شده به اپراتور" },
            7: { code: 7, message: "ارسال شده به گیرنده" },
            8: { code: 8, message: "ارسال نشده به گیرنده" },
            9: { code: 9, message: "ارسال نشده به اپراتور" },
            10: { code: 10, message: "ارسال نشده به مخابرات" },
            11: { code: 11, message: "ارسال نشده به مخابرات" },
            12: { code: 12, message: "ارسال نشده به مخابرات" },
            13: { code: 13, message: "ارسال نشده به مخابرات" },
            14: { code: 14, message: "ارسال نشده به مخابرات" },
            15: { code: 15, message: "ارسال نشده به مخابرات" },
            16: { code: 16, message: "ارسال نشده به مخابرات" },
            17: { code: 17, message: "ارسال نشده به مخابرات" },
            18: { code: 18, message: "ارسال نشده به مخابرات" },
            19: { code: 19, message: "ارسال نشده به مخابرات" },
            20: { code: 20, message: "ارسال نشده به مخابرات" },
            21: { code: 21, message: "ارسال نشده به مخابرات" },
            22: { code: 22, message: "ارسال نشده به مخابرات" },
            23: { code: 23, message: "ارسال نشده به مخابرات" },
            24: { code: 24, message: "ارسال نشده به مخابرات" },
            25: { code: 25, message: "ارسال نشده به مخابرات" },
            26: { code: 26, message: "ارسال نشده به مخابرات" },
            27: { code: 27, message: "ارسال نشده به مخابرات" },
            28: { code: 28, message: "ارسال نشده به مخابرات" },
            29: { code: 29, message: "ارسال نشده به مخابرات" },
            30: { code: 30, message: "ارسال نشده به مخابرات" },
            31: { code: 31, message: "ارسال نشده به مخابرات" },
            32: { code: 32, message: "ارسال نشده به مخابرات" },
            33: { code: 33, message: "ارسال نشده به مخابرات" },
            34: { code: 34, message: "ارسال نشده به مخابرات" },
            35: { code: 35, message: "ارسال نشده به مخابرات" },
            36: { code: 36, message: "ارسال نشده به مخابرات" },
            37: { code: 37, message: "ارسال نشده به مخابرات" },
            38: { code: 38, message: "ارسال نشده به مخابرات" },
            39: { code: 39, message: "ارسال نشده به مخابرات" },
            40: { code: 40, message: "ارسال نشده به مخابرات" },
            41: { code: 41, message: "ارسال نشده به مخابرات" },
            42: { code: 42, message: "ارسال نشده به مخابرات" },
            43: { code: 43, message: "ارسال نشده به مخابرات" },
            44: { code: 44, message: "ارسال نشده به مخابرات" },
            45: { code: 45, message: "ارسال نشده به مخابرات" },
            46: { code: 46, message: "ارسال نشده به مخابرات" },
            47: { code: 47, message: "ارسال نشده به مخابرات" },
            48: { code: 48, message: "ارسال نشده به مخابرات" },
            49: { code: 49, message: "ارسال نشده به مخابرات" },
            50: { code: 50, message: "ارسال نشده به مخابرات" }
        };

        return status[code] || { code: -1, message: "نامشخص" };
    }

    private getCodeMessage(code: number): string {
        const messages: { [key: number]: string } = {
            0: "موفق",
            1: "ناموفق",
            2: "ناموفق",
            3: "ناموفق",
            4: "ناموفق",
            5: "ناموفق",
            6: "ناموفق",
            7: "ناموفق",
            8: "ناموفق",
            9: "ناموفق",
            10: "ناموفق",
            11: "ناموفق",
            12: "ناموفق",
            13: "ناموفق",
            14: "ناموفق",
            15: "ناموفق",
            16: "ناموفق",
            17: "ناموفق",
            18: "ناموفق",
            19: "ناموفق",
            20: "ناموفق",
            21: "ناموفق",
            22: "ناموفق",
            23: "ناموفق",
            24: "ناموفق",
            25: "ناموفق",
            26: "ناموفق",
            27: "ناموفق",
            28: "ناموفق",
            29: "ناموفق",
            30: "ناموفق",
            31: "ناموفق",
            32: "ناموفق",
            33: "ناموفق",
            34: "ناموفق",
            35: "ناموفق",
            36: "ناموفق",
            37: "ناموفق",
            38: "ناموفق",
            39: "ناموفق",
            40: "ناموفق",
            41: "ناموفق",
            42: "ناموفق",
            43: "ناموفق",
            44: "ناموفق",
            45: "ناموفق",
            46: "ناموفق",
            47: "ناموفق",
            48: "ناموفق",
            49: "ناموفق",
            50: "ناموفق"
        };

        return messages[code] || "نامشخص";
    }
}

export default TrezSMSClient; 