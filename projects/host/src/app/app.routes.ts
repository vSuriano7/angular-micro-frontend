import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'my-remote-app',
        loadComponent: () => loadRemoteModule('remote', './Component').then((m) => m.AppComponent),
    },
    {
        path: 'my-remote-mf1',
        loadComponent: () => loadRemoteModule('mf1', './Component').then((m) => m.AppComponent),
    },
];
