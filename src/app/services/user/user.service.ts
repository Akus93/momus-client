import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import { DOMAIN } from '../../globals';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

}
