import Sidebar, {SidebarItem} from '../../static/sidebar';
import { getEntryBySlug } from 'astro:content';

export interface NeighbourArticle {
  title: string;
  slug: string;
}

export interface NeighbourArticles {
  previous?: NeighbourArticle;
  next?: NeighbourArticle;
}

export async function getNeighbourArticles(currentSlug: string): Promise<NeighbourArticles> {
  const mainSection = currentSlug.substring(0, currentSlug.indexOf('/'));
  console.log(mainSection);
  
  const sidebarSection = Sidebar['/' + mainSection +  '/'];
  if (!sidebarSection) {
    return { previous: undefined, next: undefined };
  }

  console.log(sidebarSection)
  
  for (let i = 0; i < sidebarSection.length; i++) {
    console.log(sidebarSection[i])
    if (sidebarSection[i] === currentSlug) {
      return getNeighbourArticlesInternal(
        mainSection, 
        i === 0 ? undefined : sidebarSection[i - 1],
        i === sidebarSection.length - 1 ? undefined : sidebarSection[i + 1]);
    } else if(typeof sidebarSection[i] === 'string') {
      continue;
    } else {
      console.log('last')
      const lookIntoResult = await lookInto(sidebarSection[i] as SidebarItem, currentSlug, mainSection);
      if (lookIntoResult.next || lookIntoResult.previous) {
        return lookIntoResult;
      } else {
        continue;
      }
    }
  }

  return { previous: undefined, next: undefined };
}

async function lookInto(item: SidebarItem, currentSlug: string, mainSection: string): Promise<NeighbourArticles> {  
  console.log('lookInto', item)
  
  if (item.children.length === 0) {
    return { previous: undefined, next: undefined };
  }

  for (let i = 0; i < item.children.length; i++) {
    const child = item.children[i]
    if (typeof child === 'string' && currentSlug.endsWith(child)) {
      return getNeighbourArticlesInternal(
        mainSection, 
        i === 0 ? undefined : item.children[i - 1],
        i === item.children.length - 1 ? undefined : item.children[i + 1]);
    } else if (typeof child !== 'string') {
      const lookIntoResult = await lookInto(child, currentSlug, mainSection);
      if (lookIntoResult.next || lookIntoResult.previous) {
        return lookIntoResult;
      } else {
        continue;
      }
    }
  }

  return { previous: undefined, next: undefined };  
}

async function getNeighbourArticlesInternal(
  mainSection: string,
  previousItem?: SidebarItem | string,
  nextItem?: SidebarItem | string)
{
  const previous = previousItem ? await getEntryBySlug('articles', buildSlug(mainSection, getLastInnerChild(previousItem))) : undefined;
  const next = nextItem ? await getEntryBySlug('articles', buildSlug(mainSection, getFirstInnerChild(nextItem))) : undefined;
  
  return {
    previous: !previous ? undefined : {
      title: previous.data.title,
      slug: previous.slug
    },      
    next: !next ? undefined : {
      title: next.data.title,
      slug: next.slug
    }
  }
}

function buildSlug(mainSection: string, child: string): string {
  return `${mainSection}/${child}`
}

function getLastInnerChild(item: SidebarItem | string): string {
  while ((item as any).children?.length > 0) {
    item = (item as any).children[(item as any).children.length - 1]; 
  }
  
  return (item as any).children ? (item as SidebarItem).title : item as string;
}

function getFirstInnerChild(item: SidebarItem | string): string {
  while ((item as any).children?.length > 0) {
    item = (item as any).children[0];
  }

  return (item as any).children ? (item as SidebarItem).title : item as string;
}