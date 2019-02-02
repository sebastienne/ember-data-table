/*jshint unused:false */
import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export default Mixin.create({
  queryParams: {
    filter: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true }
  },
  mergeQueryOptions() {
    return {};
  },
  model(params) {
    const options = {
      sort: params.sort,
      page: {
        number: params.page,
        size: params.size
      }
    };
    let controller = this.controllerFor(this.routeName);
    let { filterFields, filterValuePrefix } = controller.getProperties(
      'filterFields',
      'filterValuePrefix'
    );

    if (params.filter) {
      if (filterFields && filterFields.length > 0) {
        filterValuePrefix = filterValuePrefix ? filterValuePrefix : '';
        let filterValue = `${filterValuePrefix}${params.filter}`;

        filterFields.forEach(field => {
          options[`filter[${field}]`] = filterValue;
        });
      } else {
        options['filter'] = params.filter;
      }
    }
    $.extend(options, this.mergeQueryOptions(params));
    return this.get('store').query(this.get('modelName'), options);
  },
  actions: {
    loading(transition) {
      let controller = this.controllerFor(this.routeName);
      controller.set('isLoadingModel', true);
      transition.promise.finally(function() {
        controller.set('isLoadingModel', false);
      });

      return true; // bubble the loading event
    }
  }
});
