import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:  [
      {
      path: 'feed',
      children: [
        {
        path: '',
        loadChildren: () => import('../feed/feed.module').then( m => m.FeedPageModule)
        }
      ]
      },
      {
      path: 'upload',
      children: [
        {
          path: '',
          loadChildren: () => import('../upload/upload.module').then( m => m.UploadPageModule)
        }
      ]
      },
      {
      path: 'profile',
      children: [
        {
          path: '',
          loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
        }
      ]
      },
      {
      path: '',
      redirectTo: 'feed',
      pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
