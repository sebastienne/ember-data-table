import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/number-pagination';

export default Component.extend({
  layout,
  classNames: ['data-table-pagination'],
  currentPage: computed('page', {
    get() {
      let page = this.get('page');
      return page ? parseInt(page) : 1;
    },
    set(key, value) {
      return this.set('page', value);
    }
  }),
  firstPage: computed('links', function() {
    return this.get('links.first.number') || 1;
  }),
  lastPage: computed('links', function() {
    return this.get('links.last.number') || 1;
  }),
  isFirstPage: computed('firstPage', 'currentPage', function() {
    return this.get('firstPage') == this.get('currentPage');
  }),
  isLastPage: computed('lastPage', 'currentPage', function() {
    return this.get('lastPage') == this.get('currentPage');
  }),
  hasMultiplePages: computed('lastPage', function() {
    return this.get('lastPage') > 1;
  }),
  startItem: computed('size', 'currentPage', function() {
    return this.get('size') * (this.get('currentPage') - 1) + 1;
  }),
  endItem: computed('startItem', 'nbOfItems', function() {
    return this.get('startItem') + this.get('nbOfItems') - 1;
  }),
  pageOptions: computed('firstPage', 'lastPage', function() {
    const nbOfPages = this.get('lastPage') - this.get('firstPage') + 1;
    return Array.from(
      new Array(nbOfPages),
      (val, index) => this.get('firstPage') + index
    );
  }),
  actions: {
    changePage(link) {
      this.set('page', link['number'] || 1);
    }
  }
});
