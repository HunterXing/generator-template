module.exports = {
  description: '生成Atom卡片列表增删改查模板',
  prompts: [
    {
      type: 'input', // 交互类型
      name: 'gen_path', //参数名称
      message: '请输入生成文件路径(routes.ts路径)[eg:AI/algo-mange]', // 交互提示
    },
    {
      type: 'input', // 交互类型
      name: 'component_name', //参数名称
      message: '请输入组件名称[eg: AIMange]', // 交互提示
    },
    {
      type: 'input', // 交互类型
      name: 'request_path', //参数名称
      message: '请输入接口路径[eg:video-ai-manage/algorithm]', // 交互提示
    },
  ],

  actions: data => {
    let { gen_path } = data; // 这个变量来自控制台输入，在模板文件中可以使用。
    if(!gen_path) {
      gen_path = 'code-gen'
    }
    return [
      {
        type: 'add',
        path: `src/pages/${gen_path}/service.ts`,
        templateFile: 'code-template/card-list/service.ts.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/data.d.ts`,
        templateFile: 'code-template/card-list/data.d.ts.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/index.tsx`,
        templateFile: 'code-template/card-list/index.tsx.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/index.less`,
        templateFile: 'code-template/card-list/index.less.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/CardItem.tsx`,
        templateFile: 'code-template/card-list/CardItem.tsx.hbs',
      },
      // atom 文件夹
      {
        type: 'add', // 新增文件
        path: `src/pages/${gen_path}/atom/atoms.ts`, // 生成文件的路径
        templateFile: 'code-template/card-list/atom/atoms.ts.hbs', // 模板文件的路径
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/atom/atomActions.ts`,
        templateFile: 'code-template/card-list/atom/atomActions.ts.hbs',
      },
      // hooks文件夹
      {
        type: 'add',
        path: `src/pages/${gen_path}/hooks/index.tsx`,
        templateFile: 'code-template/card-list/hooks/index.tsx.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/hooks/useEditHook.tsx`,
        templateFile: 'code-template/card-list/hooks/useEditHook.tsx.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/hooks/useListHook.tsx`,
        templateFile: 'code-template/card-list/hooks/useListHook.tsx.hbs',
      },
      // save文件夹
      {
        type: 'add',
        path: `src/pages/${gen_path}/save/index.tsx`,
        templateFile: 'code-template/card-list/save/index.tsx.hbs',
      },
      {
        type: 'add',
        path: `src/pages/${gen_path}/save/index.less`,
        templateFile: 'code-template/card-list/save/index.less.hbs',
      }
    ];
  },
};
