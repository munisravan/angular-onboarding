import { AOStorage, Config } from './../../../interfaces';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private data: AOStorage;
  private store: Storage = localStorage;

  constructor(@Inject('config') public config: Config) {
    this.loadData();
  }

  private loadData() {
    const data = JSON.parse(this.store.getItem('aoData'));
    if (data) {
      this.data = data;
    } else {
      this.data = {
        enabled: true,
        step: 0
      };
      this.saveData();
    }
  }

  private saveData() {
    this.store.setItem('aoData', JSON.stringify(this.data));
  }

  public getData(): AOStorage {
    return this.data;
  }

  public updateData(newData: AOStorage) {
    this.data = newData;
    this.saveData();
  }
}
