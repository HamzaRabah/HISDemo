//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IPatientsClient {
    createPatient(command: CreatePatientCommand): Observable<string>;
    getPatients(name: string | null | undefined, fileNo: number | null | undefined, phoneNumber: string | null | undefined, pageNumber: number, pageSize: number): Observable<PaginatedListOfPatientDto>;
    updatePatient(id: string, command: UpdatePatientCommand): Observable<void>;
    deletePatient(id: string): Observable<void>;
    getPatient(id: string): Observable<PatientDto>;
}

@Injectable({
    providedIn: 'root'
})
export class PatientsClient implements IPatientsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }

    createPatient(command: CreatePatientCommand): Observable<string> {
        let url_ = this.baseUrl + "/api/Patients";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreatePatient(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreatePatient(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<string>;
                }
            } else
                return _observableThrow(response_) as any as Observable<string>;
        }));
    }

    protected processCreatePatient(response: HttpResponseBase): Observable<string> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 201) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result201 = resultData201 !== undefined ? resultData201 : <any>null;
    
            return _observableOf(result201);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getPatients(name: string | null | undefined, fileNo: number | null | undefined, phoneNumber: string | null | undefined, pageNumber: number, pageSize: number): Observable<PaginatedListOfPatientDto> {
        let url_ = this.baseUrl + "/api/Patients?";
        if (name !== undefined && name !== null)
            url_ += "Name=" + encodeURIComponent("" + name) + "&";
        if (fileNo !== undefined && fileNo !== null)
            url_ += "FileNo=" + encodeURIComponent("" + fileNo) + "&";
        if (phoneNumber !== undefined && phoneNumber !== null)
            url_ += "PhoneNumber=" + encodeURIComponent("" + phoneNumber) + "&";
        if (pageNumber === undefined || pageNumber === null)
            throw new Error("The parameter 'pageNumber' must be defined and cannot be null.");
        else
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === undefined || pageSize === null)
            throw new Error("The parameter 'pageSize' must be defined and cannot be null.");
        else
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPatients(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPatients(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PaginatedListOfPatientDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<PaginatedListOfPatientDto>;
        }));
    }

    protected processGetPatients(response: HttpResponseBase): Observable<PaginatedListOfPatientDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PaginatedListOfPatientDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    updatePatient(id: string, command: UpdatePatientCommand): Observable<void> {
        let url_ = this.baseUrl + "/api/Patients/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdatePatient(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdatePatient(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processUpdatePatient(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    deletePatient(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/Patients/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeletePatient(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeletePatient(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processDeletePatient(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getPatient(id: string): Observable<PatientDto> {
        let url_ = this.baseUrl + "/api/Patients/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPatient(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPatient(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PatientDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<PatientDto>;
        }));
    }

    protected processGetPatient(response: HttpResponseBase): Observable<PatientDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PatientDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class CreatePatientCommand implements ICreatePatientCommand {
    name?: string;
    fileNo?: number;
    citizenId?: string;
    birthdate?: Date;
    gender?: number;
    nationality?: string;
    phoneNumber?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    contactPerson?: string;
    contactRelation?: string;
    contactPhone?: string;
    firstVisitDate?: Date;

    constructor(data?: ICreatePatientCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.fileNo = _data["fileNo"];
            this.citizenId = _data["citizenId"];
            this.birthdate = _data["birthdate"] ? new Date(_data["birthdate"].toString()) : <any>undefined;
            this.gender = _data["gender"];
            this.nationality = _data["nationality"];
            this.phoneNumber = _data["phoneNumber"];
            this.email = _data["email"];
            this.country = _data["country"];
            this.city = _data["city"];
            this.street = _data["street"];
            this.address1 = _data["address1"];
            this.address2 = _data["address2"];
            this.contactPerson = _data["contactPerson"];
            this.contactRelation = _data["contactRelation"];
            this.contactPhone = _data["contactPhone"];
            this.firstVisitDate = _data["firstVisitDate"] ? new Date(_data["firstVisitDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CreatePatientCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreatePatientCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["fileNo"] = this.fileNo;
        data["citizenId"] = this.citizenId;
        data["birthdate"] = this.birthdate ? this.birthdate.toISOString() : <any>undefined;
        data["gender"] = this.gender;
        data["nationality"] = this.nationality;
        data["phoneNumber"] = this.phoneNumber;
        data["email"] = this.email;
        data["country"] = this.country;
        data["city"] = this.city;
        data["street"] = this.street;
        data["address1"] = this.address1;
        data["address2"] = this.address2;
        data["contactPerson"] = this.contactPerson;
        data["contactRelation"] = this.contactRelation;
        data["contactPhone"] = this.contactPhone;
        data["firstVisitDate"] = this.firstVisitDate ? this.firstVisitDate.toISOString() : <any>undefined;
        return data;
    }
}

export interface ICreatePatientCommand {
    name?: string;
    fileNo?: number;
    citizenId?: string;
    birthdate?: Date;
    gender?: number;
    nationality?: string;
    phoneNumber?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    contactPerson?: string;
    contactRelation?: string;
    contactPhone?: string;
    firstVisitDate?: Date;
}

export class UpdatePatientCommand implements IUpdatePatientCommand {
    id?: string;
    name?: string;
    fileNo?: number;
    citizenId?: string;
    birthdate?: Date;
    gender?: number;
    nationality?: string;
    phoneNumber?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    contactPerson?: string;
    contactRelation?: string;
    contactPhone?: string;
    firstVisitDate?: Date;

    constructor(data?: IUpdatePatientCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.fileNo = _data["fileNo"];
            this.citizenId = _data["citizenId"];
            this.birthdate = _data["birthdate"] ? new Date(_data["birthdate"].toString()) : <any>undefined;
            this.gender = _data["gender"];
            this.nationality = _data["nationality"];
            this.phoneNumber = _data["phoneNumber"];
            this.email = _data["email"];
            this.country = _data["country"];
            this.city = _data["city"];
            this.street = _data["street"];
            this.address1 = _data["address1"];
            this.address2 = _data["address2"];
            this.contactPerson = _data["contactPerson"];
            this.contactRelation = _data["contactRelation"];
            this.contactPhone = _data["contactPhone"];
            this.firstVisitDate = _data["firstVisitDate"] ? new Date(_data["firstVisitDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): UpdatePatientCommand {
        data = typeof data === 'object' ? data : {};
        let result = new UpdatePatientCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["fileNo"] = this.fileNo;
        data["citizenId"] = this.citizenId;
        data["birthdate"] = this.birthdate ? this.birthdate.toISOString() : <any>undefined;
        data["gender"] = this.gender;
        data["nationality"] = this.nationality;
        data["phoneNumber"] = this.phoneNumber;
        data["email"] = this.email;
        data["country"] = this.country;
        data["city"] = this.city;
        data["street"] = this.street;
        data["address1"] = this.address1;
        data["address2"] = this.address2;
        data["contactPerson"] = this.contactPerson;
        data["contactRelation"] = this.contactRelation;
        data["contactPhone"] = this.contactPhone;
        data["firstVisitDate"] = this.firstVisitDate ? this.firstVisitDate.toISOString() : <any>undefined;
        return data;
    }
}

export interface IUpdatePatientCommand {
    id?: string;
    name?: string;
    fileNo?: number;
    citizenId?: string;
    birthdate?: Date;
    gender?: number;
    nationality?: string;
    phoneNumber?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    contactPerson?: string;
    contactRelation?: string;
    contactPhone?: string;
    firstVisitDate?: Date;
}

export class PatientDto implements IPatientDto {
    id?: string;
    name?: string;
    fileNo?: number;
    citizenId?: string;
    birthdate?: Date;
    gender?: number;
    nationality?: string;
    phoneNumber?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    contactPerson?: string;
    contactRelation?: string;
    contactPhone?: string;
    firstVisitDate?: Date;
    recordCreationDate?: Date;

    constructor(data?: IPatientDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.fileNo = _data["fileNo"];
            this.citizenId = _data["citizenId"];
            this.birthdate = _data["birthdate"] ? new Date(_data["birthdate"].toString()) : <any>undefined;
            this.gender = _data["gender"];
            this.nationality = _data["nationality"];
            this.phoneNumber = _data["phoneNumber"];
            this.email = _data["email"];
            this.country = _data["country"];
            this.city = _data["city"];
            this.street = _data["street"];
            this.address1 = _data["address1"];
            this.address2 = _data["address2"];
            this.contactPerson = _data["contactPerson"];
            this.contactRelation = _data["contactRelation"];
            this.contactPhone = _data["contactPhone"];
            this.firstVisitDate = _data["firstVisitDate"] ? new Date(_data["firstVisitDate"].toString()) : <any>undefined;
            this.recordCreationDate = _data["recordCreationDate"] ? new Date(_data["recordCreationDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): PatientDto {
        data = typeof data === 'object' ? data : {};
        let result = new PatientDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["fileNo"] = this.fileNo;
        data["citizenId"] = this.citizenId;
        data["birthdate"] = this.birthdate ? this.birthdate.toISOString() : <any>undefined;
        data["gender"] = this.gender;
        data["nationality"] = this.nationality;
        data["phoneNumber"] = this.phoneNumber;
        data["email"] = this.email;
        data["country"] = this.country;
        data["city"] = this.city;
        data["street"] = this.street;
        data["address1"] = this.address1;
        data["address2"] = this.address2;
        data["contactPerson"] = this.contactPerson;
        data["contactRelation"] = this.contactRelation;
        data["contactPhone"] = this.contactPhone;
        data["firstVisitDate"] = this.firstVisitDate ? this.firstVisitDate.toISOString() : <any>undefined;
        data["recordCreationDate"] = this.recordCreationDate ? this.recordCreationDate.toISOString() : <any>undefined;
        return data;
    }
}

export interface IPatientDto {
    id?: string;
    name?: string;
    fileNo?: number;
    citizenId?: string;
    birthdate?: Date;
    gender?: number;
    nationality?: string;
    phoneNumber?: string;
    email?: string;
    country?: string;
    city?: string;
    street?: string;
    address1?: string;
    address2?: string;
    contactPerson?: string;
    contactRelation?: string;
    contactPhone?: string;
    firstVisitDate?: Date;
    recordCreationDate?: Date;
}

export class PaginatedListOfPatientDto implements IPaginatedListOfPatientDto {
    items?: PatientDto[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;

    constructor(data?: IPaginatedListOfPatientDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(PatientDto.fromJS(item));
            }
            this.pageNumber = _data["pageNumber"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            this.hasPreviousPage = _data["hasPreviousPage"];
            this.hasNextPage = _data["hasNextPage"];
        }
    }

    static fromJS(data: any): PaginatedListOfPatientDto {
        data = typeof data === 'object' ? data : {};
        let result = new PaginatedListOfPatientDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["pageNumber"] = this.pageNumber;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export interface IPaginatedListOfPatientDto {
    items?: PatientDto[];
    pageNumber?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}