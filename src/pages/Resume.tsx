import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// 定义博客数据接口
interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  problem: string;
  solution: string;
 收获: string;
  imageUrl: string;
  detailsUrl?: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// 博客数据
const blogData = {
  basicInfo: {
    name: "阿胡",
  title: "产品经理 | AI探索者",
  bio: "拥有4年ToB企业级产品管理经验，对企业需求有深刻的理解，能快速提炼客户需求并转化为可执行的产品策略。\n近6个月内自主研发多个办公自动化与知识管理工具项目，擅长在传统系统与创新工具之间建立桥梁。\n代表作InfinitSet无代码内容发布平台项目，在2025年世界人工智能大会(WAIC)上作为“独立开发者”项目进行展出。",
  avatarUrl: "https://lf-code-agent.coze.cn/obj/x-ai-cn/268624281858/attachment/ChatGPT Image 2025年5月17日 19_01_27_20250803194552.png"
  },
  
  projects: [
    {
      id: 1,
      name: "InfiniteSet无代码内容发布平台",
      startDate: "2025年05月",
      endDate: "至今",
      problem: "非技术用户难以将飞书多维表格数据转化为美观的在线品牌橱窗，传统开发流程耗时且效率低",
      solution: "独立设计、开发并上线无代码内容发布平台，帮助非技术用户将飞书多维表格数据一键转化为由AI智能优化的、设计精美的在线品牌橱窗。深度集成飞书开放平台API，实现用户表格数据的安全、实时同步。",
      收获: "项目在2025世界人工智能大会(WAIC)成功进行市场验证，独立负责从0到1的全过程，包括产品设计(PRD/UX)、全栈开发、AI集成、部署上线与市场验证，完整地将一个需求洞察转化为商业构想并落地。",
  imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=pixel+art+style+no-code+content+publishing+platform&sign=6b2d37ff7547b7a48da1855d4b558d80",
  detailsUrl: "https://www.infinitesettools.cn/"
    },
    {
      id: 2,
      name: "Dify多模态内容工作流",
      startDate: "2025年03月",
      endDate: "2025年04月",
      problem: "传统内容创作流程繁琐且周期长，难以实现内容生产的自动化与提效",
      solution: "针对传统内容创作流程问题，通过AIGC技术实现内容生产的自动化与提效。深入分析内容创作者的核心痛点，规划设计基于Dify平台的'文本一图像一视频'自动化生成链路，实现关键节点的AI能力模块化编排。",
      收获: "实现多模态内容的规模化、自动化生产，优化内容创作流程，缩短创作周期35%，显著降低内容创作的时间与人力成本，初步验证AIGC在提升内容多样性与创意质量方面的潜力。",
  imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=pixel+art+style+multimodal+content+workflow&sign=7410f25e8425555c347b9cb5133ee958",
  detailsUrl: "https://bcn083gcmcwy.feishu.cn/wiki/H2l4wrNDmioxNpkqKSAchu3Zn1b?from=from_copylink"
    },
    {
      id: 3,
      name: "智能发票归档工具",
      startDate: "2025年02月",
      endDate: "2025年03月",
      problem: "制片人员处理发票流程繁琐，需要手动下载、重命名、分类、归档，耗时且容易出错",
      solution: "深入访谈制片人员，梳理出发票处理的核心痛点，并转化为清晰的产品需求文档。运用Trae开发自动获取163/QQ邮箱发票PDF，实现智能命名、分类、文件夹归档。",
      收获: "减少人工处理时间50%，优化归档流程，提高制片人员整理效率，解决了发票处理过程中的重复性劳动问题。",
  imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=pixel+art+style+intelligent+invoice+management&sign=d3959ced432b2903f55c68207f6a8736",
  detailsUrl: "https://bcn083gcmcwy.feishu.cn/wiki/SW2dw1BUiizxujkp91ocXJXQn8e?from=from_copylink"
    },
    {
      id: 4,
      name: "自建项目知识库(Ollama + Cherry Studio)",
      startDate: "2024年11月",
      endDate: "至今",
      problem: "日常工作中，大量非结构化的项目文档、笔记和资料分散存储，传统关键词搜索难以精准定位信息，导致信息查找效率低下",
      solution: "独立完成从环境配置、模型下载(Ollama)到知识库建立的全过程，成功打造'用户提问一意图识别一知识检索一生成答案'的全链路，实现结合个人文档进行回答的智能问答功能。",
      收获: "极大优化个人信息管理与工作流程，将重复性的信息查找变为一次性的精准提问，显著提升个人工作质量与效率，减少信息查找时间40%。",
  imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=pixel+art+style+knowledge+base+system&sign=2abd5b736766ef413b60a48bb7f03989",
  detailsUrl: "https://example.com/knowledge-base"
    }
  ],
  
  services: [
    {
      id: 1,
      title: "产品设计咨询",
      description: "提供从需求分析到产品落地的全流程设计咨询服务，帮助你打造用户喜爱的产品",
      icon: "fa-pencil-ruler"
    },
    {
      id: 2,
      title: "AI工具定制开发",
      description: "根据业务需求定制开发AI辅助工具，提升工作效率，减少重复劳动",
      icon: "fa-robot"
    },
    {
      id: 3,
      title: "流程优化方案",
      description: "分析现有业务流程，提供数字化转型和效率优化方案，降低成本提升产出",
      icon: "fa-project-diagram"
    },
    {
      id: 4,
      title: "知识管理系统搭建",
      description: "帮助团队构建高效的知识管理系统，提升信息检索效率和团队协作能力",
      icon: "fa-database"
    }
  ]
};

// 基本信息组件
const BasicInfoSection: React.FC<{ info: typeof blogData.basicInfo }> = ({ info }) => {
  return (
     <section className="border-4 border-black bg-white p-6 mb-8 shadow-[4px_4px_0_rgba(0,0,0,1)]">
       <div className="flex flex-col md:flex-row items-start">
         {/* 像素风格头像 */}
         <div className="w-24 h-24 border-4 border-black mb-4 md:mb-0 md:mr-6 overflow-hidden relative">
           <img 
             src={info.avatarUrl} 
             alt="阿胡的头像" 
             className="w-full h-full object-cover"
           />
           <div className="absolute top-0 left-0 bg-[#FFD700] w-6 h-6 flex items-center justify-center border-b-2 border-r-2 border-black">
             <i className="fa-solid fa-star text-xs"></i>
           </div>
         </div>
         
         <div className="flex-1">
           <h2 className="text-2xl font-bold mb-3 border-b-2 border-black pb-1">关于我</h2>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{info.name}</h3>
              <p className="italic text-[#666]">
                "You are your own creator🫧"
              </p>
            </div>
            <p className="text-[#555] mb-4">{info.title}</p>
             <p className="text-sm leading-relaxed text-[#333] mb-6 whitespace-pre-line">
              {info.bio}
            </p>
           
           {/* 联系方式 */}
           <div className="pt-4 border-t-2 border-black">
             <h4 className="font-bold mb-3 text-lg">联系方式</h4>
             <div className="flex items-center mb-2">
               <i class="fa-brands fa-weixin mr-3 text-[#7BB32E] text-lg"></i>
               <span className="text-base">Shineeyehu</span>
             </div>
             <div className="flex items-center">
               <i class="fa-solid fa-envelope mr-3 text-[#D44638] text-lg"></i>
               <span className="text-base">littleduckhu@163.com</span>
             </div>
           </div>
         </div>
       </div>
    </section>
  );
};

// 项目展示组件
const ProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  
  return (
     <section className="border-4 border-black bg-white p-6 mb-8 shadow-[4px_4px_0_rgba(0,0,0,1)]">
       <h2 className="text-2xl font-bold mb-5 border-b-2 border-black pb-1">项目实践</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         {/* 项目列表 */}
         <div className="md:col-span-4">
           <div className="border-2 border-black bg-[#f8f8f8] p-2">
             {projects.map(project => (
               <button
                 key={project.id}
                 onClick={() => setActiveProject(project)}
                 className={`w-full text-left p-3 mb-3 transition-all duration-200 ${
                   activeProject.id === project.id 
                     ? 'bg-[#FFD700] font-bold border-2 border-black' 
                     : 'border-2 border-gray-300 hover:border-black'
                 }`}
               >
                 {project.name}
               </button>
             ))}
           </div>
         </div>
         
         {/* 项目详情 */}
         <div className="md:col-span-8">
           <div className="border-2 border-black bg-white p-5 h-full flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-bold border-b-2 border-black pb-2">
                  {activeProject.name}
                </h3>
                <div className="text-right text-sm text-gray-600 mt-1">
                  {activeProject.startDate} - {activeProject.endDate}
                </div>
              </div>
             
             <div className="mb-5 border-2 border-black overflow-hidden">
               <img 
                 src={activeProject.imageUrl} 
                 alt={activeProject.name}
                 className="w-full h-48 object-cover"
               />
             </div>
             
             <div className="space-y-5 flex-grow">
               <div>
                  <h4 className="font-bold bg-[#e0e0e0] p-2 mb-2">背景</h4>
                 <p className="text-sm pl-3">{activeProject.problem}</p>
               </div>
               
               <div>
                  <h4 className="font-bold bg-[#e0e0e0] p-2 mb-2">行动</h4>
                 <p className="text-sm pl-3">{activeProject.solution}</p>
               </div>
               
               <div>
                 <h4 className="font-bold bg-[#e0e0e0] p-2 mb-2">收获</h4>
                 <p className="text-sm pl-3">{activeProject.收获}</p>
               </div>
             </div>
             
                  {/* 根据项目ID决定按钮行为 */}
                  {activeProject.id === 4 ? (
                    <button 
                      className="pixel-btn bg-[#4CAF50] mt-6 w-full py-3"
                      onClick={() => toast("阿胡正在补充案例ing，敬请期待~", { duration: 3000, position: 'top-center' })}
                    >
                      查看详细案例
                    </button>
                  ) : (
                    <a href={activeProject.detailsUrl} target="_blank" rel="noopener noreferrer">
                      <button className="pixel-btn bg-[#4CAF50] mt-6 w-full py-3">
                        查看详细案例
                      </button>
                    </a>
                  )}
           </div>
         </div>
       </div>
     </section>
  );
};

// 服务展示组件
const ServicesSection: React.FC<{ services: Service[] }> = ({ services }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
     <section className="border-4 border-black bg-white p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
       <h2 className="text-2xl font-bold mb-5 border-b-2 border-black pb-1">可提供服务</h2>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         {services.map(service => (
           <div 
             key={service.id} 
             className="border-2 border-black bg-[#f8f8f8] p-5 hover:bg-[#f0f0f0] transition-colors duration-200"
           >
             <div className="text-3xl mb-4 text-[#FF6B6B]">
               <i class={`fa-solid ${service.icon}`}></i>
             </div>
             <h3 className="text-lg font-bold mb-3 border-b border-black pb-1">
               {service.title}
             </h3>
             <p className="text-sm text-[#555]">
               {service.description}
             </p>
           </div>
         ))}
       </div>
       
       {/* 联系按钮 */}
        <div className="mt-10 text-center">
          <button 
            className="pixel-btn bg-[#FF6347] py-3 px-8 text-base"
            onClick={() => setShowContactModal(true)}
          >
            联系我讨论您的需求
          </button>
        </div>
        
        {/* 联系方式弹窗 */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] w-full max-w-md">
              <div className="flex justify-between items-center border-b-4 border-black p-4">
                <h3 className="text-xl font-bold">联系方式</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-xl font-bold hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <i className="fa-brands fa-weixin text-2xl text-[#7BB32E] mr-4"></i>
                  <span className="text-lg">Shineeyehu</span>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-envelope text-2xl text-[#D44638] mr-4"></i>
                  <span className="text-lg">littleduckhu@163.com</span>
                </div>
              </div>
              <div className="border-t-4 border-black p-4 text-center">
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="pixel-btn bg-gray-300 text-black py-2 px-6"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
     </section>
  );
};

// 像素风格博客页面
const BlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("info");
  
   return (
     <div className="min-h-screen bg-[#E0F7FA] p-4 md:p-8 flex flex-col items-center">
       {/* 侧边栏和内容区域的整体容器 */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white border-4 border-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-lg overflow-hidden h-full">
         {/* 侧边导航栏 */}
         <div className="w-full md:w-56 border-r-4 border-black flex-shrink-0">
           <div className="bg-[#f8f8f8] border-b-4 border-black py-4 text-center">
               <h1 className="text-xl font-bold text-[#2E8B57]">AHu‘s Blog</h1>
           </div>
           
           <div className="flex flex-col p-4">
             <button
               onClick={() => setActiveTab("info")}
               className={`py-3 px-4 mb-3 text-left transition-all duration-200 ${
                 activeTab === "info" 
                   ? 'bg-[#FFD700] font-bold border-2 border-black' 
                   : 'border-2 border-gray-300 hover:border-black'
               }`}
             >
               <i className="fa-solid fa-user mr-2"></i>基本信息
             </button>
             <button
               onClick={() => setActiveTab("projects")}
               className={`py-3 px-4 mb-3 text-left transition-all duration-200 ${
                 activeTab === "projects" 
                   ? 'bg-[#FFD700] font-bold border-2 border-black' 
                   : 'border-2 border-gray-300 hover:border-black'
               }`}
              >
                <i className="fa-solid fa-code mr-2"></i>AI项目实践
              </button>
             <button
               onClick={() => setActiveTab("services")}
               className={`py-3 px-4 border-2 transition-all duration-200 text-left ${
                 activeTab === "services" 
                   ? 'bg-[#FFD700] font-bold border-black' 
                   : 'border-gray-300 hover:border-black'
               }`}
             >
               <i className="fa-solid fa-handshake mr-2"></i>可提供服务
             </button>
           </div>
         </div>
         
         {/* 主内容区域 */}
          <div className="flex-grow p-6 md:p-8 h-[962.3px] overflow-auto">
           {/* 内容区域 */}
           <div>
             {activeTab === "info" && <BasicInfoSection info={blogData.basicInfo} />}
             {activeTab === "projects" && <ProjectsSection projects={blogData.projects} />}
             {activeTab === "services" && <ServicesSection services={blogData.services} />}
           </div>
         </div>
       </div>
       
       {/* 页脚 */}
       <footer className="mt-12 text-center text-sm w-full max-w-6xl">
         <div className="border-2 border-black bg-white inline-block p-3">
           <p>© 2025 阿胡的个人博客</p>
         </div>
       </footer>
     </div>
  );
};

export default BlogPage;