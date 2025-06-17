import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        const shouldPreload = route.data?.['preload'];

        if (shouldPreload) {
            console.log(`✅ Preloading: ${route.path}`);
            return load();
        }
        
        console.log(`🚫 Skipping preload: ${route.path}`);
        return of(null);
    }
}
