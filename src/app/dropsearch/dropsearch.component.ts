import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dropsearch',
  templateUrl: './dropsearch.component.html',
  styleUrls: ['./dropsearch.component.scss']
})
export class DropsearchComponent implements OnInit {
  @Input() values = [];
  public list = [];
  public value = "";
  public selected: number = 0;
  public valueselected = null;
  @Input() public placeholder = "Selecione um item...";
  @Input() public color = "#161414fd";
  @Input() public width = "350px";

  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.list = this.values
    if (this.color) document.documentElement.style.setProperty('--pcolor', this.color);
    if (this.width) document.documentElement.style.setProperty('--w', this.width);
    this.$('inputsh').addEventListener('focus', (evt) => {
      // this.$('dropsh').style.left = evt.target['offsetLeft'] - 18 + "px"
      // this.$('dropsh').style.top = evt.target['offsetTop'] + 25 + "px"
      this.list = this.values
      this.selected = 0
      // this.valueselected = null;
      this.$('dropsh').style.display = 'block'
      setTimeout(() => {
        this.$('dropsh').style.opacity = '1'
      }, 100);
    });
    this.$('inputsh').addEventListener('focusout', () => {
      this.$('dropsh').style.opacity = '0'
      setTimeout(() => {
        this.$('dropsh').style.display = 'none'
      }, 500);
    });
  }

  private $(id: string): HTMLElement {
    return document.getElementById(id)
  }

  select(item) {
    this.value = item.label + " (" + item.value + ")"
    this.valueselected = item.value;
    this.event.emit(item.value)
  }

  onChange(evt) {
    if (evt.key == 'ArrowDown') {
      if (this.selected > 0) this.list[this.selected - 1]['isselected'] = false;
      this.selected = this.selected + 1 < this.list.length + 1 ? this.selected + 1 : 1;
      this.list[this.selected - 1]['isselected'] = true;
      this.value = this.list[this.selected - 1]['label'] + " (" + this.list[this.selected - 1]['value'] + ")"
      this.valueselected = this.list[this.selected - 1]['value']
      this.event.emit(this.list[this.selected - 1]['value'])
    }
    else if (evt.key == 'ArrowUp') {
      if (this.selected > 0) this.list[this.selected - 1]['isselected'] = false;
      this.selected = this.selected - 1 > 0 ? this.selected - 1 : this.list.length;
      this.list[this.selected - 1]['isselected'] = true;
      this.value = this.list[this.selected - 1]['label'] + " (" + this.list[this.selected - 1]['value'] + ")"
      this.valueselected = this.list[this.selected - 1]['value']
      this.event.emit(this.list[this.selected - 1]['value'])
    } else {
      this.list = this.values
      this.list = this.values.filter((item: any) => {
        try {
          return (item.label.toUpperCase().indexOf(this.value.toUpperCase()) > -1 || String(item.value).toUpperCase().indexOf(this.value.toUpperCase()) > -1)
        } catch (_) {
          return false
        }
      })
    }
  }


  public lostFocus(evt) {
    if (this.value) {
      let res = this.values.find((item: any) => {
        try {
          return (item.label.toUpperCase().trim().indexOf(this.value.toUpperCase().trim()) > -1 || String(item.value).toUpperCase().indexOf(this.value.toUpperCase()) > -1)
        } catch (_) {
          return false
        }
      })
      if (res) {
        this.value = res.label + " (" + res.value + ")"
        this.valueselected = res.value
        this.event.emit(res.value)
      }
    }
    if (!this.valueselected) this.value = ""
  }
}
