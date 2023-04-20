import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { EndPoints } from '../common/component/endPoints/endpoints';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AppinterceptorService implements HttpInterceptor {

  constructor(private loader:LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("token");
    this.loader.setLoading(true);
    const baseUrl = EndPoints.requestUrl; // have to change based the url of in the backend
    req = req.clone({
      url: `${baseUrl}/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(req).pipe(finalize(()=>this.loader.setLoading(false)));
  }
}
