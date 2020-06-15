export default (name) => () => import('@/views/'+name.toLowerCase()+'/'+name+'.vue')
