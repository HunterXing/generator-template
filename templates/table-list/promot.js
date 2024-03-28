module.exports = {
  description: '生成Atom表格列表增删改查模板',
  prompts: [
    {
      type: 'input', // 交互类型
      name: 'gen_path', //参数名称
      message: '请输入生成路径[eg:AI/ai-mange]', // 交互提示
      default: 'code-gen/table-list', // 默认值
    },
    {
      type: 'input', // 交互类型
      name: 'component_name', //参数名称
      message: '请输入组件名称[eg:AIMange](默认Demo)', // 交互提示
    },
    {
      type: 'input', // 交互类型
      name: 'request_path', //参数名称
      message: '请输入接口路径[eg:ai-manage/algo](默认云端mock)', // 交互提示
    },
    {
      type: 'confirm',
      name: 'want_route',
      message: '你想要给新页面添加路由吗?',
    },
    {
      type: 'list',
      name: 'want_route_type',
      message: '添加路由形式',
      choices: [
        { name: '选择已有目录', value: 'use_exist_route' },
        { name: '新增目录', value: 'add_new_route' },
      ],
      when: function(answer) {
        return answer.want_route;
      },
    },
    {
      type: 'list',
      name: 'use_exist_route',
      message: '选择已有目录',
      choices: [
        { name: '视频分析', value: 'ai' },
        { name: '视图库', value: 'viewLibrary' },
        { name: '设备管理', value: 'device' },
        { name: '日志管理', value: 'monitorLogger' },
        { name: '系统管理', value: 'system' },
      ],
      when: function(answer) {
        return answer.want_route_type == 'use_exist_route';
      },
    },
    {
      type: 'input',
      name: 'new_route_path',
      message: '新路由目录路径[eg:/AI]',
      when: function(answer) {
        return answer.want_route_type == 'add_new_route';
      },
      default: '/list',
    },
    {
      type: 'input',
      name: 'new_route_name',
      message: '新路由目录名称[eg:视频AI分析]',
      when: function(answer) {
        return answer.want_route_type == 'add_new_route';
      },
      default: '列表管理',
    },
    {
      type: 'input',
      name: 'routes_path',
      message: '填写页面url路径[eg:/AI/ai-mange]',
      when: function(answer) {
        return answer.want_route;
      },
      default: '/list/table',
    },
    {
      type: 'input',
      name: 'routes_name',
      message: '填写页面名称[eg:算法管理]',
      when: function(answer) {
        return answer.want_route;
      },
      default: '表格列表',
    },
  ],

  actions: data => {
    const { gen_path, want_route_type, use_exist_route} = data;

    let actionArr = [
      {
        type: 'add', // 新增文件
        path: `src/pages/${gen_path}/atom/atoms.ts`, // 生成文件的路径
        templateFile: 'code-template/table-list/atom/atoms.hbs', // 模板文件的路径
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/atom/atomActions.ts`,
        templateFile: 'code-template/table-list/atom/atomActions.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/hooks/index.tsx`,
        templateFile: 'code-template/table-list/hooks/index.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/hooks/useEditHook.ts`,
        templateFile: 'code-template/table-list/hooks/useEditHook.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/hooks/useListHook.tsx`,
        templateFile: 'code-template/table-list/hooks/useListHook.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/service.ts`,
        templateFile: 'code-template/table-list/service.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/data.d.ts`,
        templateFile: 'code-template/table-list/data.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/save/index.tsx`,
        templateFile: 'code-template/table-list/save/index.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/index.tsx`,
        templateFile: 'code-template/table-list/index.hbs',
        force: true,
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/index.less`,
        templateFile: 'code-template/table-list/index.less.hbs',
        force: true,
      },
      // 修改权限,  仅开发可见菜单
      {
        type: 'modify',
        pattern: /getPermissionRoutes\(routes\);/g,
        path: 'src/app.tsx', // 生成文件的路径
        template: '// getPermissionRoutes(routes);',
      },
    ];

    // 修改路由文件
    if (want_route_type === 'use_exist_route') {
      let patterns = {
        ai: /\/\/ code-gen-ai-route/g,
        viewLibrary: /\/\/ code-gen-viewLibrary-route/g,
        device: /\/\/ code-gen-device-route/g,
        monitorLogger: /\/\/ code-gen-monitorLogger-route/g,
        system: /\/\/ code-gen-system-route/g,
      }
      actionArr.push({
        type: 'modify',
        pattern: patterns[use_exist_route],
        path: `config/routes.ts`,
        templateFile: 'code-template/route-item.hbs',
      });
    } else if (want_route_type === 'add_new_route') {
      actionArr.push({
        type: 'modify',
        pattern: /\/\/ code-gen-new-route/g,
        path: `config/routes.ts`, // 生成文件的路径
        templateFile: 'code-template/routes.hbs',
      });
    }
    return actionArr;
  },
};
